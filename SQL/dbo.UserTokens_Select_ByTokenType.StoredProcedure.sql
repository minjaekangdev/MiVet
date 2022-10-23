USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[UserTokens_Select_ByTokenType]    Script Date: 10/23/2022 10:33:21 AM ******/
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

CREATE PROC [dbo].[UserTokens_Select_ByTokenType]
										@TokenType int


as 

/*


	DECLARE @TokenType int = 1

	EXECUTE dbo.UserTokens_Select_ByTokenType
										@TokenType


*/

BEGIN


		SELECT [Token]
			  ,[UserId]
			  ,[TokenType]
		  FROM [dbo].[UserTokens]
		WHERE TokenType = @TokenType


END


GO
