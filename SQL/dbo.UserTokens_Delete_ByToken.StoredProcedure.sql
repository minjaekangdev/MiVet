USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Delete_ByToken]    Script Date: 10/23/2022 10:33:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- Code Reviewer: 


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

CREATE PROC [dbo].[UserTokens_Delete_ByToken]
										@Token varchar(200) 


as 

/*
	SELECT *
	FROM dbo.UserTokens

	DECLARE @Token varchar(200) = 'justatesttoken123123'

	EXECUTE dbo.UserTokens_Delete_ByToken
										@Token

	SELECT *
	FROM dbo.UserTokens
*/

BEGIN


			DELETE FROM [dbo].[UserTokens]
				  WHERE Token = @Token


END


GO
