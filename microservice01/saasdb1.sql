-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 11, 2022 at 07:43 PM
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
  `DateTime` datetime NOT NULL,
  `MapCode` varchar(10) NOT NULL,
  `ProductionType` varchar(255) NOT NULL,
  `ResolutionCode` varchar(255) NOT NULL,
  `ActualGenerationOutput` float NOT NULL,
  `ActualConsumption` float NOT NULL,
  `UpdateTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Aggregated_Generation`
--
ALTER TABLE `Aggregated_Generation`
  ADD PRIMARY KEY (`DateTime`,`MapCode`,`ProductionType`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
