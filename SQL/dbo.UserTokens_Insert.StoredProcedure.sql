USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Insert]    Script Date: 10/23/2022 10:33:21 AM ******/
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

CREATE PROC [dbo].[UserTokens_Insert]
								@Token varchar(200)
								,@UserId int
								,@TokenType int

/*

SELECT *
FROM dbo.UserTokens

DECLARE @Token varchar(200) = 'justatesttoken123123'
		,@UserId int = 35
		,@TokenType int = 2

		EXECUTE dbo.UserTokens_Insert @Token
									,@UserId
									,@TokenType

SELECT *
FROM dbo.UserTokens

*/

as

BEGIN

			INSERT INTO [dbo].[UserTokens]
					   ([Token]
					   ,[UserId]
					   ,[TokenType])
				 VALUES
						(@Token
						,@UserId
						,@TokenType)

END


GO
