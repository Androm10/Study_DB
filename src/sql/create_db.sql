
CREATE DATABASE IF NOT EXISTS nostra_db;
USE nostra_db;

CREATE TABLE IF NOT EXISTS users
(
id			SERIAL			PRIMARY KEY,
login		VARCHAR(50)		NOT NULL,
password	VARCHAR(255)	NOT NULL,
UNIQUE(login)
);

CREATE TABLE IF NOT EXISTS operations
(
id			SERIAL			PRIMARY KEY,
wallet_id	BIGINT 			UNSIGNED NOT NULL,
create_at	TIMESTAMP		NOT NULL,
type		VARCHAR(50)		NOT NULL,
money		FLOAT8			NOT NULL
);

CREATE TABLE IF NOT EXISTS  wallets
(
id			SERIAL			PRIMARY KEY,
user_id		BIGINT			UNSIGNED NOT NULL,
money		FLOAT8			NOT NULL DEFAULT 0,
info		TEXT			
);

CREATE TABLE IF NOT EXISTS  user_info
(
id			SERIAL			PRIMARY KEY,
user_id		BIGINT			UNSIGNED NOT NULL,
username	VARCHAR(255)	NOT NULL,
avatar		BLOB,
about		TEXT,
UNIQUE(username)	
);

CREATE TABLE IF NOT EXISTS  roles
(
id			SERIAL			PRIMARY KEY,
name		CHARACTER(50)	NOT NULL
);

CREATE TABLE IF NOT EXISTS  bets
(
id			SERIAL			PRIMARY KEY,
user_id		BIGINT			UNSIGNED NOT NULL,
result_id	BIGINT			UNSIGNED NOT NULL,
money		FLOAT8			NOT NULL,
create_at	TIMESTAMP		NOT NULL
);

CREATE TABLE IF NOT EXISTS  results
(
id			SERIAL			PRIMARY KEY,
event_id	BIGINT			UNSIGNED NOT NULL,
name		VARCHAR(100)	NOT NULL,
info		TEXT,
is_winner	BOOLEAN			DEFAULT TRUE,
coefficient	FLOAT8			NOT NULL
);

CREATE TABLE IF NOT EXISTS  events
(
id			SERIAL			PRIMARY KEY,
name		VARCHAR(100)	NOT NULL,
info		TEXT,
creator_id	BIGINT			UNSIGNED,
create_at	TIMESTAMP		NOT NULL,
deleted_at	TIMESTAMP,
is_active	BOOLEAN			DEFAULT TRUE,
image		VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS  users_roles
(
id			SERIAL			PRIMARY KEY,
user_id		BIGINT			UNSIGNED NOT NULL,
role_id		BIGINT			UNSIGNED NOT NULL
);

ALTER TABLE  operations 
ADD CONSTRAINT fk_operations_wallet_id_wallets_id
 FOREIGN KEY (wallet_id) REFERENCES wallets (id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;

ALTER TABLE  wallets 
ADD CONSTRAINT fk_wallets_user_id_users_id
 FOREIGN KEY (user_id) REFERENCES users(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    
ALTER TABLE  user_info 
ADD CONSTRAINT fk_user_info_user_id_users_id
 FOREIGN KEY (user_id) REFERENCES users(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    
ALTER TABLE  bets 
ADD CONSTRAINT fk_bets_user_id_users_id
 FOREIGN KEY (user_id) REFERENCES users(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    
ALTER TABLE  bets 
ADD CONSTRAINT fk_bets_result_id_results_id
 FOREIGN KEY (result_id) REFERENCES  results(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    
ALTER TABLE  results 
ADD CONSTRAINT fk_results_events_id_events_id
 FOREIGN KEY (event_id) REFERENCES  events(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    
ALTER TABLE  events 
ADD CONSTRAINT fk_events_creator_id_users_id
 FOREIGN KEY (creator_id) REFERENCES users(id) 
	ON DELETE SET NULL
	ON UPDATE CASCADE;
    
ALTER TABLE  users_roles 
ADD CONSTRAINT fk_users_roles_user_id_users_id
 FOREIGN KEY (user_id) REFERENCES users(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;

ALTER TABLE  users_roles 
ADD CONSTRAINT fk_users_roles_role_id_roles_id
 FOREIGN KEY (role_id) REFERENCES roles(id) 
	ON DELETE CASCADE
	ON UPDATE CASCADE;
    