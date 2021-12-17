Use SOURCE

create function Net_sales(
@quantity int,
@price DEC(10,1),
@discount DEC(3,2)
)
Returns DEC(10,1)
AS
Begin
return @quantity*@price*(1-@discount)
End

select dbo.Net_sales(24,300,0.4) AS Salesvalue

Alter function Net_sales(
@quantity int,
@prices DEC(10,1),
@dis DEC(3,2)
)
Returns DEC(10,1)
AS
Begin
return @quantity*@prices*(1-@dis)
End

create function tblemp()
returns table
AS
Return(select*from Employee)

select*from tblemp()

CREATE FUNCTION MULTIVALUED()  
RETURNS @Employee TABLE  
(employeeid INT, employeename VARCHAR(50), cityid INT) AS  
BEGIN  
    INSERT INTO @Employee  
    SELECT E.employeeid, E.employeename, E.cityid FROM Employee E;  
    UPDATE @Employee SET employeename = 'Graeme Smith' WHERE employeeid = 3;  
    RETURN  
END   

select * from MULTIVALUED()

CREATE TABLE Product_Sales(    
    Emp_Name VARCHAR(45),    
    Year INT,  
    Country VARCHAR(45),    
    Prod_name VARCHAR(45),    
    Sales DECIMAL(12,2),    
    PRIMARY KEY(Emp_Name, Year)    
);   

insert into Product_Sales(Emp_Name,Year,Country,Prod_name,Sales)
values('Arun',2015,'china','tv',80000),
('vikram',2017,'texas','desk',340.00),
('sanjay',2019,'britain','camera',600.89),
('Arun',2016,'california','car',890000)


SELECT Country, SUM(Sales) AS total_amount  
FROM Product_Sales GROUP BY Country;  

SELECT Emp_Name, Year, Country, Prod_name, Sales, SUM(Sales)   
OVER(PARTITION BY Country) as total   
FROM Product_Sales;   

SELECT Emp_Name, Year, Country, Prod_name, Sales, avg(Sales)   
OVER(PARTITION BY Country,YEAR(year)) as avg_total   
FROM Product_Sales;   

SELECT Emp_Name, Year, Country, Prod_name, Sales, MIN(Sales)   
OVER(PARTITION BY Country) as MIN_sales   
FROM Product_Sales;   

select Country, count(DISTINCT Emp_name) As number_of_employees  
FROM Product_Sales  
GROUP BY Country;  

select Country, count(DISTINCT Emp_name)over(partition by country)
As number_of_employees  
FROM Product_Sales  
GROUP BY Country; 

create table rank_demo(
firstname varchar(15),
lastname varchar(20),
city varchar(20)
)

insert into rank_demo(firstname,lastname,city)
values('madhu','gopinath','texas'),
('akhshy','ganesh','texas'),
('virat','kholi','newyork'),
('varshini','sai','california')

SELECT firstname, lastname, city,     
RANK () OVER (ORDER BY city) AS Rank_No     
FROM rank_demo; 

SELECT firstname, lastname, city,     
DENSE_RANK() OVER (ORDER BY city) AS Rank_No     
FROM rank_demo;   

SELECT firstname, lastname, city,     
ROW_NUMBER() OVER (ORDER BY city) AS Rank_No     
FROM rank_demo; 

select firstname,lastname,city,
NTILE(2) over(order by city) AS Rank_No
from rank_demo

select * from Product_Sales

SELECT Year, Prod_name, Country, Sales,       
LEAD(Sales,1) OVER (PARTITION BY Year ORDER BY Country) AS Next_Sale      
FROM Product_Sales;    

SELECT GETDATE() AS Date;  

SELECT GETUTCDATE() AS Date;  

SELECT DATENAME(day, '2021/12/17') AS Result1,  
DATENAME(month, '2021/12/17') AS Result2,  
DATENAME(year, '2021/12/17') AS Result3;  

SELECT DATEDIFF(dd,'2021/2/3', '2020/3/5') AS TotalDays,  
 DATEDIFF(MM,'2021/2/3', '2020/3/5') AS TotalMonths,    
 DATEDIFF(WK,'2021/2/3', '2020/3/5') AS TotalWeeks;  

 SET DATEFIRST 3;  
GO    
SELECT @@DATEFIRST AS startday;  

SELECT SQRT(81) AS Result1, SQRT(4) AS Result2;  

select ABS(-45) AS result

SELECT ACOS(-0.5) AS Result1  --- Display th radian of an angle

SELECT ASIN(0.5) AS Result1

SELECT CEILING(15) AS Result1,   
CEILING(22.19) AS Result2  

select FLOOR(-20.15) AS Result3; 

SELECT POWER(5,2) AS Result1  

select RADIANS(-45.01)As result

SELECT ASCII('A'), ASCII('B');  

SELECT CHARINDEX('world', 'Hello world'), CHARINDEX('world', 'Hello world', 3)

SELECT CONCAT('Hello', 'world') As Concat;  

select SOUNDEX('J')

SELECT DIFFERENCE('Hello', 'world')

select left('helloworld',3),RIGHT('helloworld',2)

SELECT LOWER('I am MSSQL')As LOWER, UPPER('Hello Javatpoint')AS UPPER;  

select RTRIM(' helloworld') AS RTRIM, LTRIM('helloworld ') AS LTRIM

select replicate ('hello',3) AS Same
















































)
