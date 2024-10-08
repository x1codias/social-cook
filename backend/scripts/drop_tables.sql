SET FOREIGN_KEY_CHECKS = 0;

SELECT CONCAT('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'socialcook';

SET FOREIGN_KEY_CHECKS = 1;