-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2022 at 04:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saasdb1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Aggregated_Generation`
--

CREATE TABLE `Aggregated_Generation` (
  `DateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `MapCode` varchar(30) NOT NULL,
  `ProductionTypeName` varchar(255) NOT NULL,
  `ResolutionCode` varchar(255) DEFAULT NULL,
  `ActualGenerationOutput` float NOT NULL,
  `ActualConsumption` float NOT NULL,
  `UpdateTime` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Country`
--

CREATE TABLE `Country` (
  `MapCode` varchar(30) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Production_Type`
--

CREATE TABLE `Production_Type` (
  `ProductionTypeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Aggregated_Generation`
--
ALTER TABLE `Aggregated_Generation`
  ADD PRIMARY KEY (`DateTime`,`MapCode`,`ProductionTypeName`),
  ADD KEY `MapCodeConstraint` (`MapCode`),
  ADD KEY `ProductionTypeNameConstraint` (`ProductionTypeName`);

--
-- Indexes for table `Country`
--
ALTER TABLE `Country`
  ADD PRIMARY KEY (`MapCode`);

--
-- Indexes for table `Production_Type`
--
ALTER TABLE `Production_Type`
  ADD PRIMARY KEY (`ProductionTypeName`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Aggregated_Generation`
--
ALTER TABLE `Aggregated_Generation`
  ADD CONSTRAINT `MapCodeConstraint` FOREIGN KEY (`MapCode`) REFERENCES `Country` (`MapCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProductionTypeNameConstraint` FOREIGN KEY (`ProductionTypeName`) REFERENCES `Production_Type` (`ProductionTypeName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
