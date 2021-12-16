USE SOURCE

CREATE TABLE Product (  
 Product_id INT PRIMARY KEY,   
 Product_name VARCHAR(40),   
 Price INT,  
 Quantity INT  
)  

insert into product(Product_id,Product_name,Price,Quantity)
values(121,'wheel',2000,2),
(122,'desk',4000,1),
(123,'laptop',25000,3)

select * from Product

BEGIN TRANSACTION  
-- SQL Statements  
 INSERT INTO Product VALUES(124, 'Headphone', 2000, 30)  
 UPDATE Product SET Price = 60000 WHERE Product_id = 123  
 -- Commit changes   
COMMIT TRANSACTION  

BEGIN TRANSACTION  
-- SQL Statements  
UPDATE Product SET Price = 5000 WHERE Product_id = 121  
DELETE FROM Product WHERE Product_id = 123  
---Undo changes
ROLLBACK TRANSACTION  

BEGIN TRANSACTION  
INSERT INTO Product VALUES(126,'Speaker', 3500, 25)  
-- Check for error  
IF(@@ERROR > 60000)  
BEGIN  
    ROLLBACK TRANSACTION  
END  
ELSE  
BEGIN  
   COMMIT TRANSACTION  
END  

select * from Product

BEGIN TRANSACTION  
 INSERT INTO Product VALUES(127, 'Desktop', 25000, 15)  
 UPDATE Product SET Quantity = 11 WHERE Product_id = 123  
 SELECT * FROM Product  
COMMIT TRANSACTION 

Begin transaction
insert into product values(128,'USB',500,12)
save transaction InsertStatement  
delete from Product WHERE Product_id = 126  
select * from Product   
ROLLBACK TRANSACTION InsertStatement  
COMMIT  

SELECT * FROM Product;  

SET IMPLICIT_TRANSACTIONS ON   
UPDATE Product SET Quantity = 10 WHERE Product_id = 123  
SELECT   
    IIF(@@OPTIONS & 1 = 2,   
    'Implicit Transaction Mode OFF',   
    'Implicit Transaction Mode ON'  
    ) AS 'Transaction Mode'   
SELECT @@TRANCOUNT AS OpenTrans   
COMMIT TRANSACTION  
SELECT @@TRANCOUNT AS OpenTrans  

dbcc opentran

sp_who2 ---to control 

BEGIN TRANSACTION  
UPDATE Product SET Quantity = 15 WHERE Product_id = 124  
SELECT @@TRANCOUNT AS OpenTrans   
COMMIT TRANSACTION  
SELECT @@TRANCOUNT AS OpenTrans  

--- Mark tran

BEGIN TRANSACTION DeleteProduct WITH MARK 'Deleted Product with id = 126'   
    DELETE Product WHERE Product_id = 126 
COMMIT TRANSACTION DeleteProduct  

select * from Product

select * from msdb.dbo.logmarkhistory ---to know the details of mark transaction

---Add product

BEGIN TRANSACTION AddProduct  
INSERT INTO Product VALUES(129, 'laptop', 25000, 10)  
UPDATE Product SET Product_name = 'USB' WHERE Product_id = 128 
COMMIT TRANSACTION AddProduct  

---NOT NULL constraints

CREATE TABLE Sales (  
    Id int NOT NULL,  
    Amount int NOT NULL,  
    Vendor_Name varchar(255)  
);

insert into Sales values(1,1234,'akhshy')
insert into Sales values(2,NULL,'suja')

---UNIQUE constraints

CREATE TABLE Sale (  
    Id int NOT NULL UNIQUE,  
    Amount int NOT NULL,  
    Vendor_Name varchar(255)  
);


insert into Sale values(1,1234,'akhshy')
insert into Sale values(1,4567,'suja')

---Check constraint
create table sal(
salary int check (salary>1000),
name varchar(10)
)

insert into Sal values(40000,'akhshy')
insert into Sal values(400,'suja')
insert into Sal values(NULL,'suja')

select * from sal

SELECT CONSTRAINT_NAME,    ---to check the type of constraints
     TABLE_SCHEMA ,  
     TABLE_NAME,  
     CONSTRAINT_TYPE  
     FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS  
   WHERE TABLE_NAME='sal'  

create table salary_info(
id int primary key NOT NULL,
salary int,
salary_date datetime NOT NULL default getdate()
)

insert into salary_info values(1,3000,'1999-10-31 00:00:00')
insert into salary_info values(2,4000)






















