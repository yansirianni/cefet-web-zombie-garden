SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema zombies
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `zombies` ;
CREATE SCHEMA IF NOT EXISTS `zombies` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `zombies` ;

-- -----------------------------------------------------
-- Table `zombies`.`zombie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zombies`.`zombie` ;

CREATE TABLE IF NOT EXISTS `zombies`.`zombie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `born` DATETIME NULL,
  `previousName` VARCHAR(45) NULL,
  `pictureUrl` VARCHAR(200) NULL,
  `bittenBy` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_zombie_bittenBy_idx` (`bittenBy` ASC),
  CONSTRAINT `fk_zombie_bittenBy`
    FOREIGN KEY (`bittenBy`)
    REFERENCES `zombies`.`zombie` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zombies`.`person`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zombies`.`person` ;

CREATE TABLE IF NOT EXISTS `zombies`.`person` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `alive` BOOLEAN NOT NULL DEFAULT 1,
  `eatenBy` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_person_eatenByZombie_idx` (`eatenBy` ASC),
  CONSTRAINT `fk_person_eatenByZombie`
    FOREIGN KEY (`eatenBy`)
    REFERENCES `zombies`.`zombie` (`id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `zombies`.`zombie`
-- -----------------------------------------------------
START TRANSACTION;
USE `zombies`;
INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zeshua', '1971-01-01 00:00:00', 'desconhecido', 'zombie1.jpg', NULL);
INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zileide', '1990-02-27 04:24:09', 'Gisleide Caetano', 'zombie2.jpg', 1);
INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zaratustra', '1991-04-18 20:03:22', 'Sara Tustra', 'zombie3.jpg', 1);
INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zinho', '1995-12-13 23:33:10', 'Jose Plinio', 'zombie4.jpg', 1);
INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zelestor', '2001-11-09 05:23:19', 'Adamastor Pinheiro', 'zombie5.jpg', 3);
INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zocrato', '2014-09-24 22:59:55', 'Socrates Sangalo', 'zombie6.jpg', 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `zombies`.`person`
-- -----------------------------------------------------
START TRANSACTION;
USE `zombies`;
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Adalberto Silva', 1, NULL);
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Justiniano Ferreira', 1, NULL);
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Ariosvaldo Pereira', 1, NULL);
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Warley Damasceno', 0, 1);
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Arlete Prada', 1, NULL);
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Herminio Aleixo', 1, NULL);
INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Osorio Oliveira', 0, 3);

COMMIT;
