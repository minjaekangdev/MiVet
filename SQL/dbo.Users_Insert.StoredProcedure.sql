USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 10/23/2022 10:33:20 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- Code Reviewer: Cayden Burns


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[Users_Insert]
							@Email nvarchar(255)
							,@Title nvarchar(10)
							,@FirstName nvarchar(100)
							,@LastName nvarchar(100)
							,@Mi nvarchar(2)
							,@Password varchar(100)
							,@AvatarUrl varchar(255)
							,@Id int OUTPUT

/*
			SELECT *
			FROM dbo.Users


			DECLARE			@Email nvarchar(255) = 'test987@email.com'
							,@Title nvarchar(10) = 'Dr.'
							,@FirstName nvarchar(100) = 'TestSubject'
							,@LastName nvarchar(100) = 'Tested'
							,@Mi nvarchar(2) = 'T'
							,@Password varchar(100) = 'Testing1!'
							,@AvatarUrl varchar(255) = 'https://google.com'
							,@Id int
			EXECUTE dbo.Users_Insert
							@Email 
							,@Title
							,@FirstName 
							,@LastName 
							,@Mi 
							,@Password 
							,@AvatarUrl 
							,@Id OUTPUT

			SELECT *
			FROM dbo.Users

*/

as

BEGIN

			INSERT INTO [dbo].[Users]
					   ([Email]
					   ,[Title]
					   ,[FirstName]
					   ,[LastName]
					   ,[Mi]
					   ,[Password]
					   ,[AvatarUrl]
					   ,[StatusTypeId])
				 VALUES
					   (@Email
					   ,@Title
					   ,@FirstName
					   ,@LastName
					   ,@Mi
					   ,@Password
					   ,@AvatarUrl
					   ,1)
			SET @Id = SCOPE_IDENTITY()


			INSERT INTO [dbo].[UserRoles]
					   ([UserId]
					   ,[RoleId])
				 VALUES
					   (@Id
					   ,1)



END


GO
