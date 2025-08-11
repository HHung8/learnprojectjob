import { application } from "express";
import pool from "../db.js";

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
            ORDER BY a.created_at = DESC
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