USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_Update]    Script Date: 10/23/2022 10:33:21 AM ******/
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

CREATE proc [dbo].[Users_Update] 
							@Id int
							,@FirstName nvarchar(100)
							,@LastName nvarchar(100)
							,@Mi nvarchar(2)
							,@AvatarUrl varchar(255)
							,@Title nvarchar(10)
/*
		DECLARE 
				@Id int = 1
		EXECUTE dbo.Users_SelectById 
									@Id


		DECLARE	
				@FirstName nvarchar(100) = 'TestUpdate123123'
				,@LastName nvarchar(100) = 'Update'
				,@Mi nvarchar(2) = 'U'
				,@AvatarUrl varchar(255) = 'https://google.com/update'
				,@Title nvarchar(10) = ''

		EXECUTE dbo.Users_Update
								@Id
								,@FirstName 
								,@LastName
								,@Mi 
								,@AvatarUrl 
								,@Title
		
		EXECUTE dbo.Users_SelectById 
									@Id


*/

as

BEGIN

		UPDATE [dbo].[Users]
		   SET 
				[FirstName] = @FirstName
				,LastName = @LastName
				,Mi = @Mi
				,AvatarUrl = @AvatarUrl
				,Title = @Title
				,DateModified = GETUTCDATE()
		 WHERE Id = @Id

END


GO
