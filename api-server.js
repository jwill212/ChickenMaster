require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");
const authConfig = require("./src/auth_config.json");
const pool = require('./db');

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));
app.use(express.json()); // To parse JSON request bodies

const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.get('/api/farm', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, "name", manager, chickencapacity, imagepath FROM public.farm;');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/chickens', async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
	c.id, 
	c.farm_id, 
	f."name" AS "FarmName", 
	c."name", 
	c.breed, 
	c.eggcolor, 
	c.hatchdate, 
	extract (month from age(c.hatchdate)) as "age",
	x_cc.checkdate,
	extract (day from age(x_cc.checkdate)) as "DaysSinceLastCheckup",
	x_cc.height, 
	x_cc.weight, 
	x_cc.healthscore,
	x_ct.checkincount
FROM public.chicken c
JOIN public.farm f on c.farm_id = f.id 
cross join lateral (
	SELECT checkdate, height, weight, healthscore
	FROM public.chickencheckin cc
	where cc.chicken_id = c.id 
	order by checkdate desc
	limit 1
) x_cc
cross join lateral (
	select count(*) "checkincount"
	from public.chickencheckin cc2
	where cc2.chicken_id = c.id 
) x_ct;`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
