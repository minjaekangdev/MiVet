USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Users_Confirm]    Script Date: 10/23/2022 10:33:20 AM ******/
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

CREATE PROC [dbo].[Users_Confirm]
									@Token varchar(200)

/*

	DECLARE @Token varchar(200) = 'b6a29f54-7b99-452e-8fae-471a6e5afd3d'
	DECLARE @Id int = (SELECT UserId
					FROM dbo.UserTokens
					WHERE Token = @Token
					AND TokenType = 1)

	SELECT *
	FROM dbo.Users
	WHERE Id = @Id

	SELECT *
	FROM dbo.UserTokens
	WHERE UserId = @Id

	EXECUTE dbo.Users_Confirm
								@Token						
	SELECT *
	FROM dbo.Users
	WHERE Id = @Id

	SELECT *
	FROM dbo.UserTokens
	WHERE UserId = @Id
*/

as

BEGIN

			DECLARE @Id int = (SELECT UserId
								FROM dbo.UserTokens
								WHERE Token = @Token
								AND TokenType = 1)

			UPDATE [dbo].[Users]
			   SET 
				  IsConfirmed = 1
				  ,[DateModified] = GETUTCDATE()
			 WHERE Id = @Id
				AND IsConfirmed = 0

			 EXECUTE dbo.UserTokens_Delete_ByToken @Token

			 SELECT Id
			 FROM dbo.Users
			 WHERE Id = @Id

END


GO
