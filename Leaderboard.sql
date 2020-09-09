 SELECT TOP 3 sum(cs.Calls), up.[Name] 
 FROM CallSession cs
 JOIN UserProfile up ON cs.UserProfileId = up.Id
 WHERE cs.[date] BETWEEN '2020-09-02' AND '2020-09-09'
 GROUP BY up.[Name]
 ORDER BY sum(cs.Calls) DESC;

 SELECT TOP 3 count(s.Id) as 'Number of Sales', up.[Name]
 FROM Sales s 
 JOIN UserProfile up on up.Id = s.UserProfileId
 WHERE s.[date] BETWEEN '2020-09-02' AND '2020-09-09'
 GROUP BY up.[Name]
 ORDER BY count(s.id) DESC;

 SELECT DISTINCT p.ProductName, sum(s.commission),  up.[Name]
 FROM Sales s 
 JOIN UserProfile up on up.Id = s.UserProfileId
 JOIN (SELECT ProductName From Product) AS p ON  p.Id = s.ProductId
 WHERE s.[date] BETWEEN '2020-09-02' AND '2020-09-09'
  GROUP BY up.[Name], p.ProductName, p.Id
 ORDER BY sum(s.commission) DESC;


