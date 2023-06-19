-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2023 at 05:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examtest`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(10) NOT NULL,
  `sn` int(10) DEFAULT NULL,
  `ans` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `instruction`
--

CREATE TABLE `instruction` (
  `id` int(10) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(10) NOT NULL,
  `sn` int(100) NOT NULL,
  `question` varchar(255) NOT NULL,
  `option_a` varchar(250) DEFAULT NULL,
  `option_b` varchar(250) DEFAULT NULL,
  `option_c` varchar(250) DEFAULT NULL,
  `option_d` varchar(250) DEFAULT NULL,
  `ans` varchar(250) DEFAULT NULL,
  `score` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `sn`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `ans`, `score`) VALUES
(1, 1, 'Reading is a/an____skill', 'active', 'neglected', 'negligible', 'productive', 'option_a', NULL),
(2, 2, 'The most challenging laguage skill is', 'reading', 'writing', 'speaking', 'listening', 'option_d', NULL),
(3, 3, 'to \'decode\' is to', 'understand', 'hear and respond', 'listen well', 'interpret well', 'option_d', NULL),
(4, 4, 'adverbs modify', 'pronouns, adjectives, prepositions', 'pronouns, adjectives verbs', 'adjectives, verbs, prepositions', 'adjectives, verbs, adverbs', 'option_d', NULL),
(5, 5, 'what kind of statement is this: Benue area ought to have another state', 'Declarative', 'Imperative', 'Suggestive', 'Conditional', 'option_c', NULL),
(6, 6, 'The cranky cars___ repaired already', 'are been', 'have been', 'have being', 'shall', 'option_a', NULL),
(7, 7, 'All of the following are synthetic fibres except', 'Polyester', 'nylon', 'Acrylic', 'Spander', 'option_d', NULL),
(8, 8, 'Any Material made of interlacing fibres is referred to as', 'yam', 'cloth', 'Fabric', 'Textile', 'option_b', NULL),
(9, 9, 'One of the ways to prevent deforestation is by', 'Beneficiation', 'Conservation', 'Prioritization', 'Green Revolution', 'option_b', NULL),
(10, 10, 'who is the current president of Nigeria', 'Muhammed Buhari', 'Bola Ahmed Tinubu', 'Peter Obi', 'Atiku Abubakar', 'opton_b', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `matric` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `matric`, `name`, `email`, `password`) VALUES
(1, 'bsu/sc/cmp/17/45671', 'peter john', 'pj@gmail.com', 'asdf'),
(2, 'bsu/sc/cmp/17/45716', 'Christian Iusah Atange', 'iusahchris@gmail.com', 'asdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instruction`
--
ALTER TABLE `instruction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `instruction`
--
ALTER TABLE `instruction`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
