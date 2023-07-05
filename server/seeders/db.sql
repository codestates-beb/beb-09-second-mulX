CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
	`address` varchar(255) UNIQUE NOT NULL,
  `token_amount` int NOT NULL DEFAULT 0,
	`eth_amount` int NOT NULL DEFAULT 0,
	`profile_img` BLOB NOT NULL,
  `created_at` datetime NOT NULL DEFAULT now(),
);

CREATE TABLE `post` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) UNIQUE NOT NULL,
	`title` varchar(255) NOT NULL,
  `content` text NOT NULL,
	`post_img` BLOB NOT NULL,
  `created_at` datetime NOT NULL DEFAULT now(),
);

CREATE TABLE `NFT` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
	`userId` varchar(255) UNIQUE NOT NULL,
  `owner` varchar(255) NOT NULL,
  `URI` varchar(255) NOT NULL,
  `price` float NOT NULL,
	`nft_img` BLOB NOT NULL,
  `created_at` datetime NOT NULL DEFAULT now(),
  `updated_at` datetime NOT NULL DEFAULT now()
);


ALTER TABLE `user` ADD FOREIGN KEY (`id`) REFERENCES `post` (`user_id`);
ALTER TABLE `NFT` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
