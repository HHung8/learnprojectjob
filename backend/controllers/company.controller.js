import pool from "../db.js";
import { getDataUri } from "../utils/dataUri.js";


// Đăng ký công ty

export const registerCompany = async(req,res) => {
    try {
        const {companyName} = req.body;
        console.log('BODY:', req.body);
        const userId = req.id;
        
        if(!companyName) {
            return res.status(400).json({
                message:"Company name is required",
                success: false,
            })  
        }

        // Kiểm tra trùng tên
        const checkQuey = `SELECT * FROM companies WHERE name = $1`;
        const existing = await pool.query(checkQuey, [companyName]);
        if(existing.rows.length > 0) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            });
        }

        // Thêm công ty
        const insertQuery = `
            INSERT INTO companies (name, user_id) VALUES ($1,$2)
            RETURNING *;
        `
        const result = await pool.query(insertQuery, [companyName, userId]);
        const company = result.rows[0];
        return res.status(201).json({
            message:"Company registered successfully.",
            company,
            success:true,
        })
    } catch (error) {
        console.error("Lỗi registerCompany", error);
        return res.status(500).json({
            message: "Lỗi server",
            success: false
        })
    }
}

//Lấy tất cả công ty của user
export const getCompany = async(req,res) => {
    try {
        const userId = req.id;
        const query = `SELECT * FROM companies WHERE user_id = $1`;
        const result = await pool.query(query, [userId]);
        if(result.rows.length === 0) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });
        }
        return res.status(200).json({
            companies:result.rows,
            success:true
        })
    } catch (error) {
        console.error("Lỗi getCompanies", error);
        return res.status(500).json({
            message: "Lỗi server",
            success: false
        })
    }
}


// Lấy công ty theo ID
export const getCompanyById = async(req,res) => {
    try {
        const companyId = req.params.id;
        const query = `SELECT * FROM companies WHERE id = $1`;
        const result = await pool.query(query, [companyId]);
        if(result.rows.length === 0) {
            return res.status(404).json({
                message: "Company not found.",
                success:false
            })
        }
        return res.status(200).json({
            company: result.rows[0],
            success:false
        });
    } catch (error) {
        console.error("Lỗi getCompanyById", error);
        return res.status(500).json({
            message:"Lỗi server",
            success: false
        })
    }
}

// Cập nhật công ty 
export const updateCompany = async(req,res) => {
    try {
        const {name, description, website, location} = req.body;
        const companyId = req.params.id;
        let logo = null;
        if(req.file) {
            logo = `/uploads/${req.file.filename}`
        }
        const updateQuery = `
            UPDATE companies 
            SET 
                name = COALESCE($1, name),
                description = COALESCE($2, description),
                website = COALESCE($3, website),
                location = COALESCE($4, location),
                logo = COALESCE($5, logo),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *;       
        `;
        const values = [ name || null, description || null, website || null, location || null, logo || null, companyId];
        const result = await pool.query(updateQuery, values);
        if(result.rows.length === 0) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company information updated.",
            company: result.rows[0],
            success: true,
        });

    } catch (error) {
        console.error("Lỗi updateCompany", error);
        return res.status(500).json({
            message: "Lỗi server",
            success: false
        })
    }
}


