CREATE TABLE Students(
ID INT,
ROLLNO INT,
NAME VARCHAR(50),
BRANCH NVARCHAR(40)
)

INSERT INTO Students(ID,ROLLNO,NAME,BRANCH)
VALUES(101,201,'sujatha','CSE'),
(102,202,'akhshy','EEE'),
(103,203,'arun','ECE'),
(104,204,'mithu','BEE'),
(105,205,'maha','MED')

select * from Students

CREATE TABLE Employees(
ID INT,
NAME VARCHAR(50),
BRANCH NVARCHAR(40),
CITYNMAE VARCHAR(20)
)

INSERT INTO Employees(ID,NAME,BRANCH,CITYNMAE)
VALUES(401,'suji','development','delhi'),
(402,'akhshy','developer','chennai'),
(403,'varsha','testing','mumbai'),
(404,'varun','QA','bangalore'),
(405,'priya','Analyst','delhi')

select * from Employees

select ID,NAME,BRANCH from Students


Declare @CITYNMAE VARCHAR(30);
Declare @NAME VARCHAR(50);
Declare @BRANCH NVARCHAR(40);
Declare cur_branch Cursor For Select CITYNMAE,NAME,BRANCH from Employees;
Open cur_branch;
Fetch Next From cur_branch into @CITYNMAE, @NAME, @BRANCH;
While @@FETCH_STATUS = 0
	Begin
		Select @NAME = NAME FROM Students  Where BRANCH = @BRANCH
		Print @NAME + 'FROM' + @BRANCH;
		Fetch Next From cur_branch into @NAME, @BRANCH;
	End
close cur_branch;
Deallocate cur_branch;

select * from Students

CREATE INDEX index_rollno ON Students(ROLLNO)
sp_Help index_rollno  ---to show the clustered or non clustered index
SELECT * FROM Students where ROLLNO>201

CREATE INDEX index_filter ON Students(ROLLNO) WHERE([ROLLNO] = (202) AND [NAME]=('akhshy'))

CREATE TABLE Persons (    
  person_name varchar(45) NOT NULL,    
  product varchar(45) DEFAULT NULL,    
  country varchar(25) DEFAULT NULL,  
  price float,  
  years int NOT NULL    
); 

INSERT INTO Persons (person_name, product, country, price, years)     
VALUES ('Steffen', 'Computer', 'USA', 20000.00, 2018),     
('Joseph', 'Laptop', 'India', 35000.00, 2016),     
('Kelvin', 'TV', 'USA', 15000.00, 2016),     
('Thomson', 'Mobile', 'France', 12500.00, 2017),   
('Donald', 'Laptop', 'England', 30000.00, 2018),    
('Joseph', 'Mobile', 'India', 18000.00, 2018),    
('Mathew', 'Desktop', 'France', 22000.00, 2017),     
('Antony', 'Mouse', 'England', 1200.00, 2016);  

SELECT * FROM Persons

SELECT *, ROW_NUMBER()
OVER (ORDER BY price) AS row_num  
FROM Persons;   

SELECT person_name, product, price, years,   
ROW_NUMBER() OVER ( PARTITION BY years ORDER BY price) AS row_num  
FROM Persons;  

SELECT * FROM ( SELECT ROW_NUMBER() 
OVER( ORDER BY price) AS row_num,person_name,product,price FROM persons)p
WHERE row_num>3 AND row_num<=6; ---row_number for pagination

---simple case
SELECT CASE 2 WHEN 1 THEN 'one' WHEN 2 THEN 'two' ELSE 'more' END AS "CASE Result";  






















