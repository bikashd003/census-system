import pool from "../Database/db.js"
const SaveCensus = async (req, res) => {
    const { id, name, gender, birthdate, vaccinated } = req.body;
    const is_vaccinated = vaccinated;
    try {
        if (!id || !name || !gender || !birthdate || !vaccinated) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const census = await pool.query("INSERT INTO people (id, name,gender,birthdate,is_vaccinated) VALUES ($1,$2,$3,$4,$5)", [id, name, gender, birthdate, is_vaccinated]);
        return res.status(200).json({ message: "Census saved successfully" })
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({ message: "Server error" })
    }
}
const GetCensus = async (req, res) => {
    try {
        const census = await pool.query("SELECT * FROM people");
        res.status(200).json(census.rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" })
    }
}


const getVaccinatedData = async (req, res) => {
    const { is_vaccinated } = req.query;
    try {
        const query = `SELECT 
            EXTRACT(YEAR FROM AGE(birthdate)) AS age,
            SUM(CASE WHEN is_vaccinated THEN 1 ELSE 0 END) AS vaccinated_count,
            SUM(CASE WHEN NOT is_vaccinated THEN 1 ELSE 0 END) AS unvaccinated_count
        FROM 
            people
        GROUP BY 
            age
        ORDER BY 
            age;
        `;

        const { rows } = await pool.query(query);

        if (is_vaccinated === "true") {
            const vaccinatedData = rows.filter(row => row.vaccinated_count > 0).map(row => ({
                age: row.age,
                vaccinatedCount: row.vaccinated_count
            }));
            return res.status(200).json({ data: vaccinatedData });
        } else if (is_vaccinated ==="false") {
            const unvaccinatedData = rows.filter(row => row.unvaccinated_count > 0).map(row => ({
                age: row.age,
                unvaccinatedCount: row.unvaccinated_count
            }));
            return res.status(200).json({  data: unvaccinatedData });
        } else {
            return res.status(400).json({ message: "Invalid value for is_vaccinated parameter" });
        }
    } catch (error) {
        console.error("Error fetching vaccination trend data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch vaccination trend data" });
    }
}
const getGenderData = async (req, res) => {
    try {
      const query = `SELECT
        EXTRACT(YEAR FROM AGE(birthdate)) AS age,
        SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END) AS male_count,
        SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) AS female_count,
        SUM(CASE WHEN gender = 'other' THEN 1 ELSE 0 END) AS other_count
      FROM
        people
      GROUP BY
        age
      ORDER BY
        age;`;
  
      const { rows } = await pool.query(query);
  
      const genderData = rows.map(row => ({
        age: row.age,
        maleCount: row.male_count,
        femaleCount: row.female_count,
        otherCount:row.other_count

      }));
  
      res.status(200).json({ data: genderData });
    } catch (error) {
      console.error("Error fetching gender data:", error);
      res.status(500).json({ message: "Failed to fetch gender data" });
    }
  };
  

export { SaveCensus, GetCensus, getVaccinatedData, getGenderData};