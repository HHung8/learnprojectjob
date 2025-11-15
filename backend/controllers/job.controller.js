import pool from "../db.js";

// Create New JOB
export const postJob = async(req,res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience,  position, companyId } = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(404).json({
                message:"Something is missing",
                status: false
            });
        }
        const requirementsArray = String(requirements).split(", ").map(r => r.trim());
        const insertQuery = `
            INSERT INTO jobs 
            (title, description, requirements, salary, location, job_type, experience_level, position, company_id, created_by)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING * 
            `
        const values = [
            title, 
            description, 
            requirementsArray,
            Number(salary),
            location,
            jobType,
            experience,
            position,
            companyId,
            userId
        ];
        const result = await pool.query(insertQuery, values);
        return res.status(201).json({
            message:"Create new job success",
            job: result.rows[0],
            success:true,
        })  
    } catch (error) {
        console.error("Error PostJob", error);
        return res.status(500).json({message: "Error Server", success: false})
        
    }
}

// Get All Jobs
export const getAllJobs = async(req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = `
            SELECT  
                j.*,
                c.id AS company_id,
                c.name AS company_name,
                c.description AS company_description,
                c.website AS company_website,
                c.location AS company_location,
                c.logo AS company_logo
            FROM jobs j
            LEFT JOIN companies c ON j.company_id = c.id
            WHERE j.title ILIKE $1 OR j.description ILIKE $1
            ORDER BY j.created_at DESC
        `;
        const result = await pool.query(query, [`%${keyword}%`]);
        if(result.rows.length === 0) {
            return res.status(404).json({message: "Not found this job", success:false});
        };
        const jobs = result.rows.map(job => {
            const {
                company_id,
                company_name, 
                company_description,
                company_website,
                company_location,
                company_logo,
                ...jobData
            } = job;
            return {
                ...jobData,
                company: {
                    id:company_id,
                    name: company_name,
                    description: company_description,
                    website: company_website,
                    location: company_location,
                    logo: company_logo
                }
            }
        })
        return res.status(200).json({
            jobs,
            success: true
        })
        // return res.status(200).json({
        //     job: result.rows,
        //     success: true
        // });

    } catch (error) {
        console.error("Error getAllJobs", error);
        return res.status(500).json({
            message: "Error Server",
            success: false
        })
    }
}

// GET Jobs By Id 
export const getJobById = async(req,res) => {
    try {
        const jobId = req.params.id;

        // Lấy thông tin job + company
        const query = `
            SELECT j.*, c.name AS company_name
            FROM jobs j
            LEFT JOIN companies c ON j.company_id = c.id
            WHERE j.id = $1
        `
        const result = await pool.query(query, [jobId]);
        if(result.rows.length === 0) {
            return res.status(404).json({message: "Job not found", success:false})
        }
        const job = result.rows[0];
        const applicationQuery = `
            SELECT a.* FROM applications a 
            WHERE a.job_id = $1
            ORDER BY a.created_at DESC
        `;  
        const applicationsResult = await pool.query(applicationQuery, [jobId])
        job.applications = applicationsResult.rows;
        return res.status(200).json({job, success:true});
    } catch (error) {
        console.error("Error getJobById", error);
        return res.status(500).json({message: "Server error", success:false});
    }
}

// get job for admin
export const getAdminJobs = async(req,res) => {
    try {
        const adminId = req.id;
        const query = `
            SELECT j.*, c.name as company_name
            FROM jobs j
            LEFT JOIN companies c ON j.company_id = c.id
            WHERE c.user_id = $1
            ORDER BY j.created_at DESC;
        `;
        const result = await pool.query(query, [adminId]);
        if(result.rows.length === 0) {
            return res.status(404).json({message: "Chưa có job nào ", success:false});
        };
        return res.status(200).json({
            jobs: result.rows,
            success: true
        })
    } catch (error) {
        console.error("Error getAdminJobs", error);
        return res.status(500).json({
            message:"Error Server",
            success:false
        })
    }
}