import { application } from "express";
import pool from "../db.js";


// nộp đơn
export const applyJob = async(req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success:false
            })
        }
        // Check if already applied 
        const checkQuery = `
            SELECT * FROM applications WHERE job_id = $1 
            AND applicant_id = $2
        `
        const checkResult = await pool.query(checkQuery, [jobId, userId]);
        if(checkResult.rows.length > 0) {
            return res.status(400).json({
                message: "You have already applicationYou have already applied for this job",
                success: false
            })
        }

        // Check if job exits
        const jobResult = await pool.query(`SELECT * FROM jobs WHERE id = $1`, [jobId]);
        if(jobResult.rows.length === 0) {
            return res.status(404).json({
                message:"Job not found", 
                success: false
            })
        };
        
        // Create new jobs
        const insertApp = `
            INSERT INTO applications (job_id, applicant_id, status, created_at)
            VALUES($1, $2, 'pending', CURRENT_TIMESTAMP)
            RETURNING *;
        `
        const newApp = await pool.query(insertApp, [jobId, userId]);
        return res.status(201).json({
            message:"Job applied successfully",
            success: true, 
            application: newApp.rows[0]
        })
    } catch (error) {
           console.error("Error applyJob", error);
           res.status(500).json({ message: "Server error", success: false });
    }
}

// Xem job đã nộp
export const getAppliedJobs = async(req,res) => {
    try {
        const userId = req.id;
        const query = `
            SELECT a.*,
                j.id AS job_id, j.title, j.description, j.created_at AS job_created_at,
                c.id AS company_id, c.name AS company_name, c.location AS company_location
            FROM applications a
            JOIN jobs j ON a.job_id = j.id
            LEFT JOIN companies c ON j.company_id = c.id
            WHERE a.applicant_id = $1 
            ORDER BY a.created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        if(result.rows.length === 0) {
            return res.status(404).json({
                message: "No applications not found",
                success: false,
            })
        }
        return res.status(200).json({
            application: result.rows,
            success: true
        })
    } catch (error) {
        console.error("Error getAppliedJobs", error);
        res.status(500).json({
            message: "Server error", 
            success: false
        });
    }
}

// Xem ứng viên cho 1 job
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const query =  `
            SELECT a.*,
                u.id AS applicant_id, u.fullname AS applicant_name, u.email AS applicant_email, u.phone_number
            FROM applications a
            JOIN users u ON a.applicant_id = u.id
            WHERE a.job_id = $1
            ORDER BY a.created_at DESC
        `;
        const result = await pool.query(query,[jobId]);
        if(result.rows.length === 0) {
            return res.status(404).json({
                message: "No applicants found for this job",
                success: false
            });
        }
        return res.status(200).json({
            application: result.rows,
            success:true
        });
    } catch (error) {
        console.error("Error getApplicants", error);
        res.status(500).json({message:"Server error", success: false});
    }
};

// Nhà tuyển dụng cập nhật trạng thái
export const updateStatus = async(req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status) {
            return res.status(400).json({
                message:"Status is required",
                success:false,
            });
        }
        const normalizedStatus = status.toLowerCase();
        const allowedStatus = ['pending', 'accepted', 'rejected'];
        if(!allowedStatus.includes(normalizedStatus)) {
            return res.status(400).json({
                message: "Invalid status value",
                success: false,
            })
        }

        const updateQuery = `
            UPDATE applications
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;
        const result = await pool.query(updateQuery, [normalizedStatus, applicationId]);
        if(result.rows.length === 0) {
            return res.status(404).json({
                message:"Application not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Status updated successfully",
            application: result.rows[0],
            success: true,
        })
    } catch (error) {
        console.error("Error updatedStatus", error);
        res.status(500).json({message:"Server error", success:false})
    }
}

// Ứng viên hủy đơn ứng tuyển
export const withdrawApplication = async(req,res) => {
    try {
        const userId = req.id;
        const applicationId = req.params.id;
        const deleteQuery = `
            DELETE FROM applications
            WHERE id = $1 AND applicant_id = $2
            RETURNING *;
        `
        const result = await pool.query(deleteQuery, [applicationId, userId]);
        if(result.rows.length === 0) {
            res.status(404).json({
                message: "Application not found or not authorized",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Application withdraw successfully",
            success: true,
        })
    } catch (error) {
        console.error("Error withdrawApplication", error);
        res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}