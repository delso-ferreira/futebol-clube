const homeLeaderboards = ` SELECT name, totalPoints, totalGames,
totalVictories, totalLosses, totalDraws,
goalsFavor, goalsOwn, (goalsFavor-goalsOwn) as goalsBalance,
ROUND(((totalPoints/(totalGames * 3))*100), 2 ) AS efficiency
 FROM
( SELECT teams.team_name as name,
COUNT(*) AS totalGames,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
SUM(
  CASE
  WHEN home_team_goals > away_team_goals THEN 3
  WHEN home_team_goals = away_team_goals THEN 1
  ELSE 0
  END
  ) as totalPoints,
  SUM( 
    CASE 
    WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
    END
    ) AS totalVictories,
    SUM( 
    CASE 
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
    END
    ) AS totalDraws,
    SUM( 
    CASE 
    WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
    END
    ) AS totalLosses
FROM matches 
LEFT JOIN teams ON matches.home_team_id = teams.id
WHERE in_progress = 0
GROUP BY name) as t
ORDER BY t.totalPoints DESC,
t.totalVictories DESC,
goalsBalance DESC,
t.goalsFavor DESC;`;

const awayLeaderboards = `
SELECT name, totalPoints, totalGames,
totalVictories, totalLosses, totalDraws,
goalsFavor, goalsOwn, (goalsFavor-goalsOwn) as goalsBalance,
((totalPoints/(totalGames * 3))*100) AS efficiency
FROM
( SELECT teams.team_name as name,
COUNT(*) AS totalGames,
SUM(away_team_goals) AS goalsFavor,
SUM(home_team_goals) AS goalsOwn,
SUM(
 CASE
 WHEN away_team_goals > home_team_goals THEN 3
 WHEN away_team_goals = home_team_goals THEN 1
 ELSE 0
 END
 ) as totalPoints,
 SUM( 
   CASE 
   WHEN away_team_goals > home_team_goals THEN 1
   ELSE 0
   END
   ) AS totalVictories,
   SUM( 
   CASE 
   WHEN away_team_goals = home_team_goals THEN 1
   ELSE 0
   END
   ) AS totalDraws,
   SUM( 
   CASE 
   WHEN away_team_goals < home_team_goals THEN 1
   ELSE 0
   END
   ) AS totalLosses
FROM matches 
LEFT JOIN teams ON matches.away_team_id = teams.id
WHERE in_progress = 0
GROUP BY name) as t
ORDER BY t.totalPoints DESC,
t.totalVictories DESC,
goalsBalance DESC,
t.goalsFavor DESC;`;

const currentLeaderboards = `SELECT name, totalPoints, totalGames,
totalVictories, totalLosses, totalDraws,
goalsFavor, goalsOwn, (goalsFavor - goalsOwn) as goalsBalance,
((totalPoints/(totalGames * 3))*100)
AS efficiency 
FROM ( SELECT teams.team_name as name,
COUNT(*) AS totalGames,
SUM(tn.home_team_goals) AS goalsFavor,
SUM(tn.away_team_goals) AS goalsOwn,
SUM(
  CASE
  WHEN tn.home_team_goals > tn.away_team_goals THEN 3
  WHEN tn.home_team_goals = tn.away_team_goals THEN 1
  ELSE 0
  END
  ) as totalPoints,
  SUM( 
    CASE 
    WHEN tn.home_team_goals > tn.away_team_goals THEN 1
    ELSE 0
    END
    ) AS totalVictories,
    SUM( 
    CASE 
    WHEN tn.home_team_goals = tn.away_team_goals THEN 1
    ELSE 0
    END
    ) AS totalDraws,
    SUM( 
    CASE 
    WHEN tn.home_team_goals < tn.away_team_goals THEN 1
    ELSE 0
    END
    ) AS totalLosses
FROM (
  SELECT 
    home_team_id,
    home_team_goals,
    away_team_goals
  FROM matches
  WHERE in_progress = 0
  UNION ALL
    SELECT 
      away_team_id as home_team_id,
      away_team_goals as home_team_goals,
      home_team_goals as away_team_goals
    FROM matches
    WHERE in_progress = 0
) as tn
LEFT JOIN teams ON tn.home_team_id = teams.id
GROUP BY name) as tms
ORDER BY tms.totalPoints DESC,
tms.totalVictories DESC,
goalsBalance DESC,
tms.goalsFavor DESC;`;

export default {
  homeLeaderboards,
  awayLeaderboards,
  currentLeaderboards,
};
