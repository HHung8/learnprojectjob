CREATE TABLE IF NOT EXISTS user_profiles (
	 id SERIAL PRIMARY KEY,
	 user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
	 bio TEXT,
	 skills TEXT[],
	 resume TEXT,
	 resume_original_name TEXT,
	 company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL,
	 profile_photo TEXT DEFAULT ''
)
