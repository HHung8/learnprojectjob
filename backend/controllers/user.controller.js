import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { getDataUri } from "../utils/dataUri.js";
dotenv.config();

export const register = async(req,res) => {
    console.log("Register API called");
    try {
        const {fullname, email, phone_number, password, role} = req.body;
        const file = req.file;
        if (!fullname || !email || !phone_number || !password || !role) {
        if (file) fs.unlinkSync(file.path); 
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        }
        // Kiểm tra email đã tồn tại chưa
        const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
        const existingUser = await pool.query(checkEmailQuery, [email]);
        if(existingUser.rows.length > 0) {
            return res.status(400).json({message: 'Email đã tồn tại'});
        }
        
        // Mã hoá mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`check hashedPassword`, hashedPassword);
        
        // Thêm người dùng mới
        const insertQuery = `
            INSERT INTO users (fullname, email, phone_number, password, role) 
            VALUES($1, $2, $3, $4, $5)
            RETURNING id, fullname, email, phone_number, password, role, created_at;
        `;
        const values = [fullname, email, phone_number, hashedPassword, role];
        const result = await pool.query(insertQuery, values);
        const newUser = result.rows[0];

        return res.status(201).json({
            message: "Đăng ký thành công",
            user: newUser
        })
    } catch (error) {
        console.error('Lỗi đăng ký', error);
        return res.status(500).json({message:"Lỗi server"})
    }
};

export const login = async(req,res) => {
    try {
        // Kiểm tra đầu vào
        const {email, password, role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message:"Email, mật khẩu, là bắt buộc",
                success:false,
            })
        };
         // Tìm user theo email
        const userQuery = "SELECT * FROM users WHERE email = $1 AND role = $2";
        const result = await pool.query(userQuery, [email,role]);

        if(result.rows.length === 0) {
            return res.status(400).json({
                message:"Tài khoản không tồn tại hoặc vai trò không chính xác",
                success: false
            })
        };
        // Check role right
         const user = result.rows[0];
         if(user.role !== role) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại với vai trò hiện tại",
                success: false
            });
         };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Mật khẩu không chính xác",
                success: false
            })
        }

        // Tạo token
        const tokenData = {userId: user.id};
        const token = jwt.sign(tokenData, process.env.JWT_SECRET || 'MySecretKey', {expiresIn: '1d'});
        // Format user trả về
        const safeUser = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role,
            created_at: user.created_at,
        } 
        // Gửi cookie token vào dữ liệu user
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        }).json({
            message:`Welcome to back, ${safeUser.fullname}`,
            user:safeUser,
            success:true
        });
    } catch (error) {
        console.log("Lỗi đăng nhập", error);
        return res.status(500).json({
            message: "Lỗi server",
            success:false
        })
    }
}

export const logout = async(req,res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path:"/", 
            expires: new Date(0)
        });
        return res.status(200).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
            console.error(error);
            return res.status(500).json({
                message:"Logout failed",
                success:false
            })
    }
}

// export const logout = async(req,res) => {
//     try {
//         return res.status(200).cookie("token", "", {maxAge:0}).json({
//             message:"Logged out successfully",
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

export const updateProfile  = async (req,res) => {
    try {
        const userId = req.body.userId;
        const file = req.file;
        const {fullname, email, phone_number, bio, skills, company_id} = req.body;
        if(!fullname || !email || !phone_number || !bio || !skills || !company_id) {
            return res.status(400).json({
                message: "Something is missing",
                success:false,
            });
        };

        const userResult = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        if(userResult.rows.length === 0) {
            return res.status(404).json({message: "User không tồn tại", success:false});
        }

        // let resumeUrl = null;
        // let resumeOriginalName = null;
        // if (file) {
        //     // const fileUri = getDataUri(file);
        //     const uploadResult = await cloudinary.v2.uploader.upload(fileUri.content);
        //     resumeUrl = uploadResult.secure_url;
        //     resumeOriginalName = file.originalname;
        // }
        const skillsArray = Array.isArray(skills) ? skills : String(skills).split(',').map(s => s.trim())
        
        await pool.query(
            `
                UPDATE users
                SET
                    fullname = COALESCE($1, fullname),
                    email = COALESCE($2, email),
                    phone_number = COALESCE($3, phone_number),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $4
            `,
            [fullname || null, email || null, phone_number || null, userId]
        );

        // Kiểm tra xem profile có chưa
        const profile = await pool.query(`
            SELECT * FROM user_profiles WHERE user_id = $1    
        `, [userId]);
        if(profile.rows.length === 0) {
            await pool.query(
                ` INSERT INTO user_profiles
                  (user_id, bio, skills, company_id)
                  VALUES($1, $2, $3, $4)
                `,
                [userId, bio, skills, company_id || null]
                // ` INSERT INTO user_profiles
                //   (user_id, bio, skills, resume, resume_original_name, company_id)
                //   VALUES($1, $2, $3, $4, $5, $6)
                // `,
                // [userId, bio, skills, resume, resumeOriginalName, company_id || null]
            );
        } else {
            await pool.query(
                 `
                    UPDATE user_profiles
                    SET
                        bio = COALESCE($1, bio),
                        skills = CASE WHEN $2::text[] IS NOT NULL THEN $2 ELSE skills END,
                        company_id = COALESCE($3, company_id)
                    WHERE user_id = $4
                `,
               [bio || null, skillsArray, company_id || null, userId]
            //     `
            //         UPDATE user_profiles
            //         SET
            //             bio = COALESCE($1, bio),
            //             skills = CASE WHEN $2::text[] IS NOT NULL THEN $2 ELSE skills END,
            //             resume = COALESCE($3, resume),
            //             resume_original_name = COALESCE($4, resume_original_name),
            //             company_id = COALESCE($5, company_id)
            //         WHERE user_id = $6
            //     `,
            //    [bio || null, skillsArray, resumeUrl, resumeOriginalName, company_id || null, userId]
            );
        }

        // Lấy thông tin user + profile sau khi updated
        const updated = await pool.query(
             `
                SELECT 
                    u.id, u.fullname, u.email, u.phone_number, u.role, u.created_at, u.updated_at,
                    p.bio, p.skills, p.company_id, p.profile_photo                     
                FROM users u 
                LEFT JOIN user_profiles p ON u.id = p.user_id
                WHERE u.id = $1
            `, [userId]);
            // `
            //     SELECT 
            //         u.id, u.fullname, u.email, u.phone_number, u.role, u.created_at, u.updated_at,
            //         p.bio, p.skills, p.resume, p.resume_original_name, p.company_id, p.profile_photo                     
            //     FROM users u 
            //     LEFT JOIN user_profiles p ON u.id = p.user_id
            //     WHERE u.id = $1
            // `, [userId]);
        return res.status(200).json({
            message: "Cập nhật hồ sơ thành công",
            success:true,
            user:updated.rows[0],
        });
    } catch (error) {
        console.error("Lỗi updateProfile", error);
        res.status(500).json({message: "Lỗi server", success:false})
    }
}