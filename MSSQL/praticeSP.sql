use newtest

-----------Add of 2 Numbers ------------------------
Create Procedure Ad(@p1 int,@p2 int,@R int output)
as
Begin
	Set @R = @p1+ @p2
End
Execute Ad 20,25,@R
select @R AS Result

----------Random Numbers -------------------------------

Create Procedure Sp_random_Value 
@first int,
@second int,
@result int output
As
Begin
     Set @result =Floor(RAND() * (@second-@first))+@first
End

Declare @r int
Execute Sp_random_Value 20,30,@r output
Select @r

--------------Unique values -------------------------
Create procedure uniquerandom(@unit int,@min int,@max int)
as 
Begin
	Declare @numbers table(number int)
	Declare @i int = 0
	Declare @number int
	while (@i&lt;@unit)
	Begin
		Set @number = floor(rand()*(@max-@min+1))+@min
		if(not exists(Select * from @numbers where number = @number))
		begin
			insert into @numbers values(@number)
			Set @i = @i + 1 
		end
	end
	Select * from @numbers order by 1
End

Execute uniquerandom 6,0,49

set nocount on  
Declare @Number int,@Fact int  
set @Fact=1  
set @Number =6;
WITH Factorial AS   
(  
SELECT  
CASE WHEN @Number<0 THEN NULL ELSE 1  
END N  
UNION all  
SELECT (N+1)    
FROM Factorial  
WHERE N < @Number   
)  
SELECT @Fact = @Fact*N from Factorial           
Print  'The factorial of' +SPACE(1) + cast(@Number as varchar(100))  + SPACE(1) + 'is:' + cast(@Fact as varchar(100))  