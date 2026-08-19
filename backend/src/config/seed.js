const bcrypt = require('bcryptjs');
const pool = require('./database');
const { config } = require('./environment');

async function seed() {
  try {
    // Seed admin account
    if (config.adminEmail && config.adminPassword) {
      const [existing] = await pool.execute('SELECT id FROM admins WHERE email = ?', [config.adminEmail]);
      if (existing.length === 0) {
        const hash = await bcrypt.hash(config.adminPassword, 12);
        await pool.execute(
          'INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)',
          ['Himanshu Tripathi', config.adminEmail, hash]
        );
        console.log('[Seed] Admin account created.');
      } else {
        console.log('[Seed] Admin account already exists.');
      }
    } else {
      console.log('[Seed] ADMIN_EMAIL/ADMIN_PASSWORD not set, skipping admin seed.');
    }

    // Always ensure fresh, exact seeded portfolio data from requirements.md
    await pool.execute('DELETE FROM education');
    await pool.execute(
      `INSERT INTO education (degree, field_of_study, institution, board_or_university, location, start_date, end_date, cgpa, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['B.Tech', 'Electronics and Communication Engineering (ECE)', 'ABES Engineering College', 'AKTU', 'Ghaziabad, India', '2024-09-01', '2028-07-01', 7.50, 1]
    );
    console.log('[Seed] Education record synced.');

    await pool.execute('DELETE FROM experiences');
    await pool.execute(
      `INSERT INTO experiences (role, organization, location, employment_type, start_date, end_date, is_current, description, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Full Stack Development Intern',
        'Thiranex',
        'Remote',
        'Internship',
        '2026-08-01',
        '2026-09-30',
        true,
        'Working on industry-oriented full-stack web development projects, responsive web application development, modern frontend/backend technologies, software development best practices, database integration, version control, and deployment workflows.',
        1
      ]
    );
    await pool.execute(
      `INSERT INTO experiences (role, organization, location, employment_type, start_date, end_date, is_current, description, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Full Stack Development Intern',
        'Pantech Solutions (Warriors Way)',
        'Remote',
        'Internship',
        '2024-07-01',
        '2024-10-31',
        false,
        'Full Stack Development internship focusing on dynamic web application development, frontend development using HTML, CSS, and JavaScript, backend development concepts, database integration, testing, and deployment experience.',
        2
      ]
    );
    console.log('[Seed] Experience records synced.');

    await pool.execute('DELETE FROM projects');
    await pool.execute(
      `INSERT INTO projects (title, slug, short_description, description, technologies, featured, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'Student Database Management System',
        'student-database-management-system',
        'A web-based Student Database Management System with secure admin authentication, complete CRUD functionality for student records, search/filtering, responsive administration interface, persistent MySQL 8.0 storage, and SQL-based data retrieval.',
        'A web-based Student Database Management System with secure admin authentication, complete CRUD functionality for student records, search/filtering, responsive administration interface, persistent MySQL 8.0 storage, and SQL-based data retrieval.',
        JSON.stringify(['Python', 'Flask', 'MySQL', 'HTML', 'CSS', 'Bootstrap']),
        true,
        1
      ]
    );
    await pool.execute(
      `INSERT INTO projects (title, slug, short_description, description, technologies, featured, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'Personal Portfolio Website',
        'personal-portfolio-website',
        'A modern full-stack personal portfolio website showcasing projects, skills, experience, education, certifications, and achievements with an authenticated admin dashboard.',
        'A database-driven portfolio built using React, Vite, Tailwind CSS, Node.js, Express.js, MySQL, and REST API with an authenticated admin dashboard.',
        JSON.stringify(['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'REST API']),
        true,
        2
      ]
    );
    console.log('[Seed] Project records synced.');

    await pool.execute('DELETE FROM skills');
    const skills = [
      ['Java', 'Programming', null, null, 1],
      ['Python', 'Programming', null, null, 2],
      ['C', 'Programming', null, null, 3],
      ['JavaScript', 'Programming', null, null, 4],
      ['HTML5', 'Web', null, null, 1],
      ['CSS3', 'Web', null, null, 2],
      ['Bootstrap', 'Web', null, null, 3],
      ['Flask', 'Web', null, null, 4],
      ['MySQL', 'Database', null, null, 1],
      ['Vercel', 'Deployment', null, null, 1],
      ['Render', 'Deployment', null, null, 2],
      ['Git', 'Developer Tools', null, null, 1],
      ['GitHub', 'Developer Tools', null, null, 2],
      ['VS Code', 'Developer Tools', null, null, 3],
      ['Postman', 'Developer Tools', null, null, 4],
      ['Data Structures & Algorithms', 'Core CS', null, null, 1],
      ['OOPs', 'Core CS', null, null, 2],
      ['DBMS', 'Core CS', null, null, 3],
    ];
    for (const s of skills) {
      await pool.execute(
        'INSERT INTO skills (name, category, proficiency, icon, display_order) VALUES (?, ?, ?, ?, ?)',
        s
      );
    }
    console.log('[Seed] Skills synced.');

    await pool.execute('DELETE FROM certifications');
    const certs = [
      ['AI Tools and ChatGPT Workshop', 'be10X', '2026-04-26', null, 1],
      ['Chatbot Development Workshop', 'Data Science & AI/ML Club, ABES Engineering College, Ghaziabad', '2026-02-13', null, 2],
      ['Clash of Coders 3.0', 'CodeChef ABESEC Chapter', '2024-11-18', null, 3],
      ['2nd Position — URJA 2.0 in Football', 'Boys\' Hostel ABESEC', '2025-04-12', 'Event held April 12–13, 2025.', 4],
      ['Voice in the Sky 2.0', 'Trishul — The Defence Aspirant Society of ABESEC', '2024-12-02', 'Event held December 2–4, 2024.', 5],
      ['Battle of Brains (BOB)', 'Enigma Programming Club, ABESEC', null, null, 6],
      ['Workshop on AI-Driven Robotics — Driverless Car', 'UniConverge Technologies Pvt. Ltd. and The IoT Academy', '2026-04-11', null, 7],
      ['Penned — Creative Writing Competition', 'Parola, the literary society of JIIT', '2025-11-09', null, 8],
      ['Full Stack Developer Workshop', 'GUVI-HCL', '2026-02-26', null, 9],
      ['Clash of Coders 4.0', 'CodeChef ABESEC Chapter', '2025-11-11', 'Event held November 11–12, 2025.', 10],
    ];
    for (const c of certs) {
      await pool.execute(
        'INSERT INTO certifications (title, issuer, issued_date, description, display_order) VALUES (?, ?, ?, ?, ?)',
        c
      );
    }
    console.log('[Seed] Certifications synced.');

    await pool.execute('DELETE FROM achievements');
    await pool.execute(
      'INSERT INTO achievements (title, display_order) VALUES (?, ?)',
      ['Senior Executive — LevelUp Dance Crew', 1]
    );
    await pool.execute(
      'INSERT INTO achievements (title, display_order) VALUES (?, ?)',
      ['Manthan 2025 Winner', 2]
    );
    console.log('[Seed] Achievements synced.');

    console.log('[Seed] Seeding complete.');
  } catch (err) {
    console.error('[Seed] Error:', err.message);
    throw err;
  }
}

module.exports = { seed };
