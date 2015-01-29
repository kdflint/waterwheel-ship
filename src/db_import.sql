
CREATE SEQUENCE application_id_seq
    START WITH 6
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
    
CREATE TABLE application (
  id integer DEFAULT nextval('application_id_seq'::regclass) NOT NULL,
  name varchar(25) NOT NULL,
  description varchar(200) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO application (id, `name`, description) VALUES
(1, 'Kumuku', 'Document cataloguing and publishing system to support grass roots human rights work in Africa'),
(2, 'Nexus', 'Comprehensive framework to enable national collaboration among community service providers'),
(3, 'Alliance-Android', 'NorthBridge development workspace-Android component'),
(4, 'Alliance-Desktop', 'NorthBridge development workspace-Desktop component'),
(5, 'Alliance-Core', 'NorthBridge development workspace-Service Core'),
(0, '<==  ', '');
    
CREATE SEQUENCE backlog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE backlog (
  id integer DEFAULT nextval('backlog_id_seq'::regclass) NOT NULL,
  project_id_fk integer NOT NULL,
  sprint_id_fk integer DEFAULT NULL,
  task_name varchar(50) NOT NULL,
  task_descr varchar(2000) DEFAULT NULL,
  task_priority enum('H','M','L') DEFAULT NULL,
  task_complete boolean NOT NULL DEFAULT false,
  PRIMARY KEY (id)
) ;

CREATE SEQUENCE campaign_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;


CREATE TABLE campaign (
  id integer DEFAULT nextval('campaign_id_seq'::regclass) NULL,
  name varchar(20) NOT NULL,
  description varchar(100) DEFAULT NULL,
  amount_goal decimal(10,2) DEFAULT NULL,
  respondent_goal varchar(10) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO campaign (id, name, description, amount_goal, respondent_goal) VALUES
(1, 'FriendsAndFamily', 'Friends and Family', '10000.00', '500'),
(2, 'Indiegogo', 'Indiegogo', '16000.00', '50');

CREATE SEQUENCE client_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE client (
	id integer DEFAULT nextval('client_id_seq'::regclass) NULL,
  userid varchar(50) DEFAULT NULL,
  password varchar(50) DEFAULT NULL,
  organization varchar(255) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  phone varchar(20) DEFAULT NULL,
  contact varchar(100) DEFAULT NULL
) ;

INSERT INTO client (id, userid, password, organization, status, email, phone, contact) VALUES
('0', 'cat', 'gocat!', 'Chicago Adventure Therapy', 'ENGAGED', 'andrea@chicagoadventuretherapy.org', '773-972-6400', 'Andrea Knepper'),
('1', 'cwest', 'gocwest!', 'Chicago West', 'PENDING', 'kathy.d.flint@gmail.com', '8668489224', 'Kathy'),
('2', 'fellow_house', 'gofh!', 'Fellowship Housing', 'ANALYSIS', 'brooke@fhcmoms.org', '847-882-2511', 'Brooke Bartlow');

CREATE SEQUENCE donation_id_seq
    START WITH 140
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE donation (
	id integer DEFAULT nextval('donation_id_seq'::regclass) NOT NULL,
  email varchar(50) DEFAULT NULL,
  fname varchar(50) DEFAULT NULL,
  lname varchar(50) DEFAULT NULL,
  company_name varchar(50) DEFAULT NULL,
  address_street varchar(50) DEFAULT NULL,
  address_city varchar(50) DEFAULT NULL,
  address_state varchar(20) DEFAULT NULL,
  address_zip varchar(10) DEFAULT NULL,
  address_country varchar(50) DEFAULT NULL,
  address_confirmed boolean NOT NULL DEFAULT false,
  amount_gross decimal(6,2) NOT NULL DEFAULT '0.00',
  processor varchar(25) DEFAULT NULL,
  processsor_transaction_id varchar(30) DEFAULT NULL,
  processor_fee decimal(10,6) NOT NULL DEFAULT '0.000000',
  processor_status varchar(20) DEFAULT NULL,
  type varchar(10) NOT NULL DEFAULT 'OTHER',
  campaign_id_fk integer NOT NULL,
  create_dttm timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  letter_printed boolean NOT NULL DEFAULT false,
  PRIMARY KEY (id)
) ;

COMMENT ON COLUMN donation.processor_status IS 'completed, error, etc.';
COMMENT ON COLUMN donation.type IS 'pledge, monetary, kind, etc.';

INSERT INTO donation (id, email, fname, lname, company_name, address_street, address_city, address_state, address_zip, address_country, address_confirmed, amount_gross, processor, processsor_transaction_id, processor_fee, processor_status, type, campaign_id, create_dttm, letter_printed) VALUES
(45, 'staycie@onebox.com', 'Staycie', 'Swenson', NULL, '400A South Blvd', 'Evanston', 'IL', '60202', 'United States',  true, '1.00', 'paypal', '0S908433E05250350', '0.320000', 'Completed', 'MONETARY', 1, '2012-08-04 23:29:57', false),
(46, 'staycie@onebox.com', 'Staycie', 'Swenson', NULL, '400A South Blvd', 'Evanston', 'IL', '60202', 'United States',  true, '1.00', 'paypal', '43U85847G35253452', '0.320000', 'Completed', 'MONETARY', 1, '2012-08-04 23:54:09', false),
(66, 'kyleblake888@yahoo.com', 'Michael', 'Oremus', NULL, '16411 135th street', 'lemont', 'IL', '60439', 'United States',  false, '100.00', 'paypal', '74L719227C760071V', '0.999999', 'Completed', 'MONETARY', 1, '2014-01-14 17:40:56', false),
(49, 'kathy.d.flint@gmail.com', 'Kathy', 'Flint', NULL, '400 South Blvd.', 'Evanston', 'IL', '60202', 'United States',  false, '1.00', 'paypal', '2V420841AV9142331', '0.320000', 'Completed', 'MONETARY', 1, '2012-08-05 02:16:43', false),
(50, 'staycie@onebox.com', 'Staycie', 'Swenson', NULL, '400A South Blvd', 'Evanston', 'IL', '60202', 'United States',  true, '1.00', 'paypal', '4N814142TJ633472N', '0.320000', 'Completed', 'MONETARY', 1, '2012-08-05 22:33:47', false),
(65, 'aleximmerman@gmail.com', 'Alexander', 'Immerman', NULL, '188 Warner St.', 'Florence', 'MA', '01062', 'United States',  false, '10.00', 'paypal', '54779656KX974164N', '0.520000', 'Completed', 'MONETARY', 1, '2012-08-07 19:29:19', false),
(53, 'staycie@onebox.com', 'Staycie', 'Swenson', NULL, '400A South Blvd', 'Evanston', 'IL', '60202', 'United States',  true, '1.00', 'paypal', '0YD43044HB5538200', '0.320000', 'Completed', 'MONETARY', 1, '2012-08-05 22:50:33', false),
(60, 'staycie@onebox.com', 'Staycie', 'Swenson', NULL, '400A South Blvd', 'Evanston', 'IL', '60202', 'United States',  true, '1.00', 'paypal', '12592569Y6340082R', '0.320000', 'Completed', 'MONETARY', 1, '2012-08-05 22:58:43', false),
(67, 'elizabeth.tatum@northbridgetech.org', 'Elizabeth', 'Tatum', NULL, '', '', '', '', 'United States',  false, '150.00', 'check', '', '0.000000', 'Completed', 'MONETARY', 1, '2012-08-13 13:00:00', false),
(68, 'zaia.gilyana@northbridgetech.org', 'Zaia', 'Gilyana', NULL, '', '', '', '', 'United States',  false, '750.00', 'check', '', '0.000000', 'Completed', 'MONETARY', 1, '2012-08-20 13:00:00', false),
(69, 'zaia.gilyana@northbridgetech.org', 'Zaia', 'Gilyana', NULL, '', '', '', '', 'United States',  false, '750.00', 'c_match', '', '0.000000', 'Completed', 'MONETARY', 1, '2012-08-24 01:43:59', false),
(71, 'sudhandhira@yahoo.com', 'Senthilkumar', 'B Rajamohan', NULL, '1400 e 55th place\napt # 716s', 'chicago', 'IL', '60637', 'United States',  true, '50.00', 'paypal', '5KD43351NX360220B', '0.999999', 'Completed', 'MONETARY', 1, '2014-01-14 17:41:19', false),
(73, 'mike@michaeljgreen.com', 'Mike', 'Green', NULL, '1809 Colfax Street', 'Evanston', 'IL', '60201', 'United States',  true, '100.00', 'paypal', '2UF9102073409381E', '0.999999', 'Completed', 'MONETARY', 1, '2013-02-27 03:39:15', false),
(74, 'kenneth.cavness@gmail.com', 'Kenneth', 'Cavness', NULL, '9701 SE Johnson Creek Blvd Apt M201', 'Happy Valley', 'OR', '97086', 'United States',  true, '10.00', 'paypal', '4HB881105S0947127', '0.520000', 'Completed', 'MONETARY', 1, '2013-04-26 16:05:40', false),
(75, 'kdflint@usbank.com', 'Kathy', 'Flint', NULL, '400 South Blvd\r\nUnit A', 'Evanston', 'IL', '60202', 'United States',  false, '1.00', 'paypal', '69N03936Y2041384F', '0.320000', 'Completed', 'MONETARY', 1, '2013-08-19 00:42:06', false),
(76, 'skrichards7@gmail.com', 'Suzanne', 'Richards', NULL, '7033 N Kedzie Ave #604', 'Chicago', 'IL', '60645', 'United States',  true, '100.00', 'paypal', '64223324XK3105507', '0.999999', 'Completed', 'MONETARY', 1, '2013-08-22 02:22:09', false),
(77, 'lk_prasanna@yahoo.com', 'Prasanna', 'Laguduva', NULL, '3233 Pennsbury Ct', 'Aurora', 'IL', '60502', 'United States',  true, '25.00', 'paypal', '4CE45980GL1765648', '0.850000', 'Completed', 'MONETARY', 1, '2013-11-24 05:32:55', false),
(78, 'andrea@chicagoadventuretherapy.org', 'Andrea', 'Knepper', NULL, '2518 W Cullom', 'Chicago', 'Illinois', '60618', 'United States',  false, '25.00', 'firstgiving via indiegogo', NULL, '2.687500', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(79, 'wjalston2@gmail.com', 'William', 'Alston', NULL, '2748 W 90th Pl', 'Evergreen Park', 'Illinois', '60805', 'United States',  false, '25.00', 'firstgiving via indiegogo', NULL, '2.687500', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(80, 'shivakumark@yahoo.com', 'Sivakumar', 'Kuppuswamy', NULL, '7010 N White Fir Dr', 'Edwards', 'Illinois', '61528', 'United States',  false, '250.00', 'firstgiving via indiegogo', NULL, '26.875000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(81, 'admin@rainbowunbroken.org', 'Suzanne', 'Coleman', NULL, '7033 N Kedzie Ave #604', 'Chicago', 'Illinois', '60645', 'United States',  false, '25.00', 'firstgiving via indiegogo', NULL, '2.687500', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(82, 'cfree27@comcast.net', 'Cynthia', 'Free', NULL, '400 South Blvd Unit E', 'Evanston', 'Illinois', '60202', 'United States',  false, '250.00', 'firstgiving via indiegogo', NULL, '26.875000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(83, 'laurih123@yahoo.com', 'Lauri', 'Hand', NULL, '', '', '', '', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(84, 'EyeGore22@hotmail.com', 'Christopher', 'Swenson', NULL, '1133 13th Ave', 'Moline', 'Illinois', '61265', 'United States',  false, '5.00', 'firstgiving via indiegogo', NULL, '0.537500', 'Completed', 'MONETARY', 2, '2014-01-14 15:30:25', false),
(85, 'craigkopinski@gmail.com', 'Craig', 'Kopinski', NULL, '1327 W North Shore Ave 1N', 'Chicago', 'Illinois', '60626', 'United States',  false, '25.00', 'firstgiving via indiegogo', NULL, '2.687500', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(86, 'villagomezj27@gmail.com', 'Jose', 'Villagomez', NULL, '4027 N Mozart Street 1', 'Chicago', 'Illinois', '60618', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(87, 'arlens@cinci.rr.com', 'Arlen', 'Swenson', NULL, '8333 Landmark Court, Unit 205', 'West Chester', 'Ohio', '45069', 'United States',  false, '250.00', 'firstgiving via indiegogo', NULL, '26.875000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(88, 'dransom99@gmail.com', 'Douglas W', 'Ransom', NULL, '607 Valleywoods Ct', 'Loveland', 'Ohio', '45140', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(89, 'crojek@alumni.uchicago.edu', 'Craig', 'Rojek', NULL, '949 Rosemary Terrace', 'Deerfield', 'Illinois', '60015', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(90, 'jmoreno22@gmail.com', 'John', 'Moreno', NULL, '1720 S. Clinton St', 'Chicago', 'Illinois', '60616', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(91, 'imaizel@hotmail.com', 'Ilia', 'Maizel', NULL, '', '', '', '', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(92, 'leedsjudy@gmail.com', 'Judy', 'Leeds', NULL, '', '', '', '', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(93, 'rfstudios@aol.com', 'Robin', 'Freedenfeld', NULL, '188 Warner St.', 'Florence', 'Massachusetts', '01062', 'United States',  false, '250.00', 'firstgiving via indiegogo', NULL, '26.875000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(94, 'alexander.immerman@northbridgetech.org', 'Alex', 'Immerman', NULL, '1741 N Honore St Apt B', 'Chicago', 'Illinois', '60622', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:42:38', false),
(95, 'alexander.buob@gmail.com', 'Alex', 'Buob', NULL, '', '', '', '', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(96, 'g_ma_2004@yahoo.com', 'Louise', 'Swenson', NULL, '1133 13th Ave', 'Moline', 'Illinois', '61265', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(97, 'a_sweet_one_2@yahoo.com', 'Kari', 'Swenson', NULL, '1133 13th Ave', 'Moline', 'Illinois', '61265', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(98, 'auntizzie22@yahoo.com', 'Elizabeth', 'Eckhardt', NULL, '7413 N Seeley Ave #3F', 'Chicago', 'Illinois', '60645', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(99, 'gyrlspy@yahoo.com', 'Janice R.', 'Yates', NULL, '2319 Oak Park Ave', 'Berwyn', 'Illinois', '60402', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(100, 'monteseyer@gmail.com', 'Monte', 'Seyer', NULL, '', '', '', '', 'United States',  false, '250.00', 'firstgiving via indiegogo', NULL, '26.875000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(101, 'fullmetallunchbox@gmail.com', 'Joshua', 'Nathan', NULL, '1444 Wisconsin Ave.', 'Berwyn', 'Illinois', '60402', 'United States',  false, '25.00', 'firstgiving via indiegogo', NULL, '2.687500', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(102, 'richard.ptack@usbank.com', 'Richard', 'Ptack', NULL, '', '', '', '', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(103, 'ksen@eb.com', 'Kunal', 'Sen', NULL, '1221 Golfview Lane', 'Flossmoor', 'Illinois', '60422', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(104, 'ldwaters@earthlink.net', 'Lisa', 'Waters', NULL, '362 Belmont Court', 'Lebanon', 'Ohio', '45036', 'United States',  false, '5.00', 'firstgiving via indiegogo', NULL, '0.537500', 'Completed', 'MONETARY', 2, '2014-01-14 15:30:25', false),
(105, 'zgilyana@gmail.com', 'Zaia', 'Gilyana ', NULL, '445 Island Ave Unit 510', 'San Diego ', 'California', '92101', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(106, 'danavaziri@yahoo.com', 'Dana', 'Talya', NULL, '3180 Sawtelle Blvd Apt 308', 'Los angeles', 'California', '90066', 'United States',  false, '50.00', 'firstgiving via indiegogo', NULL, '5.375000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(107, 'lflint@cinci.rr.com', 'Lowell', 'Flint', NULL, '8634 Alexander Court', 'West Chester', 'Ohio', '45069', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(108, 'waverlyw@gmail.com', 'Waverly', 'Walker', NULL, '1300 Lincoln Road, 1001', 'Miami Beach', 'Florida', '33139', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:43:07', false),
(109, 'stephen@gelmanmanor.com', 'Stephen', 'Gelman', NULL, '5340 N. Osceola Av', 'Chicago', 'Illinois', '60656', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(110, 'ericclim@yahoo.com', 'Eric', 'Lim', NULL, '236 Tudor Lane', 'Schaumburg', 'Illinois', '60193', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(111, 'diva@cowgrrl.com', 'Valerie', 'Cameo', NULL, '', '', '', '', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(112, 'kelly.j.johnson@comcast.net', 'Kelly', 'Johnson', NULL, '1836 Westchester Lane', 'Shakopee', 'Minnesota', '55379', 'United States',  false, '100.00', 'firstgiving via indiegogo', NULL, '10.750000', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(113, 'karenstipp@gmail.com', 'Karen', 'Stipp', NULL, '106 Virginia', 'Normal', 'Illinois', '61761', 'United States',  false, '25.00', 'firstgiving via indiegogo', NULL, '2.687500', 'Completed', 'MONETARY', 2, '2014-01-14 17:34:57', false),
(114, '', 'Joanna', 'Gwinn', NULL, '2721 Hartzell Street', 'Evanston', 'Illinois', '60201', 'United States',  false, '200.00', 'check', NULL, '0.000000', 'Completed', 'MONETARY', 2, '2014-01-14 17:46:26', true),
(115, '', 'Ethelyn', 'Bond', NULL, '2126 Dobson Street', 'Evanston', 'Illinois', '60202', 'United States',  false, '200.00', 'check', NULL, '0.000000', 'Completed', 'MONETARY', 2, '2014-01-14 17:46:41', true),
(116, '', 'Jean', 'Lieberman', NULL, '3121 Park Place', 'Evanston', 'Illinois', '60201', 'United States',  false, '200.00', 'check', NULL, '0.000000', 'Completed', 'MONETARY', 2, '2014-01-14 17:46:58', true),
(117, '', 'Kathleen', 'Chefas', NULL, '1710 West Chase Ave.', 'Chicago', 'Illinois', '60626', 'United States',  false, '200.00', 'check', NULL, '0.000000', 'Completed', 'MONETARY', 2, '2014-01-14 17:47:14', true),
(118, 'janek635@aol.com', 'Jean', 'Koten', NULL, '871 Eldorado Street', 'Winnetka', 'Illinois', '60093', 'United States',  false, '200.00', 'check', NULL, '0.000000', 'Completed', 'MONETARY', 2, '2014-01-14 17:47:28', true),
(119, 'kathy.flint@northbridgetech.org', '', '', 'NorthBridge Technology Alliance', '400 South Blvd. Unit A', 'Evanston', 'Illinois', '60202', 'United States',  false, '200.00', 'firstgiving via indiegogo', NULL, '21.500000', 'Completed', 'MONETARY', 2, '2014-01-14 17:41:59', false),
(120, 'ckeck@optonline.net', 'cynthia', 'keck', NULL, '81 ballad circle', 'holbrook', 'NY', '11741', 'United States',  true, '50.00', 'paypal', '7WH1051197403002J', '1.400000', 'Completed', 'MONETARY', 1, '2014-06-05 02:04:28', false),
(121, 'danielterrasi@gmail.com', 'Dan', 'Terrasi', NULL, '324 W. 83 St. Apt 4E', 'New York', 'NY', '10024', 'United States',  false, '2500.00', 'paypal', '1PG42493VX169840T', '55.300000', 'Completed', 'MONETARY', 1, '2014-06-10 19:00:56', false),
(122, 'villagomezj27@gmail.com', 'Jose', 'Villagomez', NULL, '4027 n mozart St', 'Chicago', 'IL', '60618', 'United States',  true, '50.00', 'paypal', '8BC04064AS492315B', '1.400000', 'Completed', 'MONETARY', 1, '2014-09-19 04:00:01', false),
(123, 'kathy.flint@northbridgetech.org', 'Kathy', 'Flint', NULL, '400 South Blvd.', 'Evanston', 'IL', '60202', 'United States',  false, '5.00', 'paypal', '70S08104NN4507154', '0.410000', 'Completed', 'MONETARY', 1, '2014-11-03 23:35:38', false),
(124, 'danielterrasi@gmail.com', 'Dan', 'Terrasi', NULL, '324 W. 83 St. Apt 4E', 'New York', 'NY', '10024', 'United States',  false, '1000.00', 'paypal', '38C36370S7716572Y', '22.300000', 'Completed', 'MONETARY', 1, '2014-08-29 06:00:00', false),
(125, 'kathy.flint@northbridgetech.org', 'Kathy', 'Flint', NULL, '400 South Blvd.', 'Evanston', 'IL', '60202', 'United States',  false, '5.00', 'paypal', '3NX43756YV352604B', '0.410000', 'Completed', 'MONETARY', 1, '2014-10-31 06:00:00', false),
(126, 'dmmack@optonline.net', 'diane', 'mack', NULL, '832 barbara blvd', 'franklin square', 'NY', '11010', 'United States',  false, '50.00', 'paypal', '66343064724147926', '1.400000', 'Completed', 'MONETARY', 1, '2014-12-14 02:19:58', false),
(127, 'jmdozer@comcast.net', 'Jimmy', 'Mendoza', NULL, '8403 Marketree Circle', 'Montgomery Village', 'MD', '20886', 'United States',  false, '50.00', 'paypal', '4BH15180GB432502L', '1.400000', 'Completed', 'MONETARY', 1, '2014-12-15 04:29:14', false),
(128, 'lyounadam@gmail.com', 'Lenord', 'Younadam', NULL, '1701 Lake Shore Crest Dr\r\nApt 36', 'Reston', 'VA', '20190', 'United States',  true, '20.00', 'paypal', '40L147986P907880G', '0.740000', 'Completed', 'MONETARY', 1, '2014-12-15 13:18:34', false),
(129, 'gina.perrone@aecom.com', 'gina', 'perrone', NULL, '107-28 89th Street', 'ozone park', 'NY', '11417', 'United States',  false, '50.00', 'paypal', '7CC231294F2169728', '1.400000', 'Completed', 'MONETARY', 1, '2014-12-15 14:38:09', false),
(130, 'rondaandmo@zoomtown.com', 'Ronda', 'Rose', NULL, '4358 Ebenezer Road', 'Cincinnati', 'OH', '45248', 'United States',  true, '100.00', 'paypal', '8XV45907D6948190C', '2.500000', 'Completed', 'MONETARY', 1, '2014-12-16 14:13:12', false),
(131, 'dreclipse2000@yahoo.com', 'Rafik', 'Cezanne', NULL, '70a Greenwich Avenue, #254', 'New York', 'NY', '10011', 'United States',  true, '50.00', 'paypal', '27W96046PR2329434', '1.400000', 'Completed', 'MONETARY', 1, '2014-12-17 02:13:19', false),
(132, 'cynthia.white2@usbank.com', 'cynthia', 'White', NULL, '12415 Partridge St. NW', 'Coon Rapids', 'MN', '55448', 'United States',  false, '75.00', 'paypal', '4BC67562H9816492H', '1.950000', 'Completed', 'MONETARY', 1, '2014-12-18 22:11:03', false),
(133, 'zgilyana@gmail.com', 'Zaia', 'Gilyana', NULL, '445 Island Ave\r\n#510', 'San Diego', 'CA', '92101', 'United States',  true, '200.00', 'paypal', '5F933914AT6625452', '4.700000', 'Completed', 'MONETARY', 1, '2014-12-20 01:40:55', false),
(134, 'joetlsty@aol.com', 'Joseph', 'Tlsty', NULL, '21 Joyce Drive', 'New City', 'NY', '10956', 'United States',  false, '100.00', 'paypal', '6SJ27473GN051173H', '2.500000', 'Completed', 'MONETARY', 1, '2014-12-21 15:37:39', false),
(135, 'dlafronz@aol.com', 'Donald', 'La Fronz', NULL, '245 West 107th Street\r\nApt. 2C', 'New York', 'NY', '10025', 'United States',  true, '100.00', 'paypal', '1CD0687735357313X', '2.500000', 'Completed', 'MONETARY', 1, '2014-12-31 15:54:00', false),
(136, '', 'Joel', 'Radezky', NULL, '', '', '', '', '', false, '50.00', 'check', '', '0.000000', 'Completed', 'MONETARY', 1, '2014-12-31 15:54:00', false),
(137, 'lisa.c.terrasi@gmail.com', 'Lisa', 'Terrasi', NULL, '397 Harvard Street\r\nApt. 6', 'Brookline', 'MA', '02446', 'United States',  true, '15.00', 'paypal', '1B363137XS453912K', '0.630000', 'Completed', 'MONETARY', 1, '2015-01-03 23:51:12', false),
(138, '', 'Robert', 'Marks', NULL, '200 E 57th St', 'New York', 'NY', '10022', 'United States',  true, '50.00', 'check', '', '0.000000', 'Completed', 'MONETARY', 1, '2015-01-12 19:00:00', false),
(139, '', 'R', 'K', NULL, '88 Woodbine Dr.', 'East Hampton', 'NY', '11937', 'United States',  true, '150.00', 'check', '', '0.000000', 'Completed', 'MONETARY', 1, '2015-01-12 19:00:00', false);


CREATE SEQUENCE event_id_seq
    START WITH 7
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE event (
  id integer DEFAULT nextval('event_id_seq'::regclass) NOT NULL,
  name varchar(50) NOT NULL,
  schedule_id_fk integer DEFAULT NULL,
  start_dttm date DEFAULT NULL,
  end_dttm date DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO event (id, name, schedule_id_fk, start_dttm, end_dttm) VALUES
(1, 'Sprint 1', 1, '2014-01-05', '2014-01-25'),
(2, 'Sprint 2', 1, '2014-01-26', '2014-02-15'),
(3, 'Sprint 3', 1, '2014-02-16', '2014-03-08'),
(4, 'Sprint 4', 1, '2014-03-09', '2014-03-29'),
(5, 'Sprint 5', 1, '2014-03-30', '2014-04-19'),
(6, 'Sprint 6', 1, '2014-04-20', '2014-05-10');

CREATE SEQUENCE project_id_seq
    START WITH 10
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE project (
  id integer DEFAULT nextval('project_id_seq'::regclass) NOT NULL,
  application_id_fk integer DEFAULT NULL,
  schedule_id_fk integer DEFAULT NULL,
  name varchar(120) DEFAULT NULL,
  descr varchar(1000) DEFAULT NULL,
  start_event_fk integer DEFAULT NULL,
  end_event_fk integer DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO project (id, application_id_fk, schedule_id_fk, name, descr, start_event_fk, end_event_fk) VALUES
(1, 1, 1, '1.1', 'Release 1.0 enhancements and support', 1, NULL),
(2, 2, 1, '1.0', 'Greenfield messaging portal', 1, NULL),
(3, 3, 1, '1.0', 'Greenfield Android app.', 1, NULL),
(4, 4, 1, '2.0', 'Build out the Resume features of Alliance Desktop', 1, NULL),
(5, 5, 1, '1.0', 'Greenfield API', 1, NULL),
(8, 4, 1, '1.1', 'Improve the existing features of Alliance Desktop', 1, NULL),
(0, 0, 1, 'Select a team, please.', '', NULL, NULL),
(9, 2, 1, 'Pilot release', 'Controlled public engagement, 500+ community organizations across Illinois ', 1, NULL);

CREATE TABLE project_leader (
  project_id_fk integer NOT NULL,
  volunteer_id_fk integer NOT NULL,
  role varchar(20) DEFAULT 'Contributor'
) ;

INSERT INTO project_leader (project_id_fk, volunteer_id_fk, role) VALUES
(2, 53, 'Coach'),
(2, 36, 'Coach');


CREATE SEQUENCE project_message_id_seq
    START WITH 12
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE project_message (
  id integer DEFAULT nextval('project_message_id_seq'::regclass) NOT NULL,
  project_id_fk integer NOT NULL,
  create_dttm timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message varchar(2999) NOT NULL,
  PRIMARY KEY (id)
) ;


INSERT INTO project_message (id, project_id_fk, create_dttm, message) VALUES
(1, 1, '2013-04-23 00:17:52', 'Since you have registered interest in this project, I''d like to give you a brief update on the Chicago-area directory of human services that NorthBridge is embarking upon in collaboration with Strengthening Chicago''s Youth (SCY) (out of Lurie Children''s Hospital).\n\nWe are in the process of expanding the list of stakeholders to include other stakeholders such as Illinois Department of Children and Family Services, Chicago Coalition for the Homeless, and the Office of the Mayor of Chicago. SCY has connections in those circles and we are looking to refine the requirements and make sure we are not duplicating efforts that are already underway.\n\nIt remains highly likely that this project will go forward.\n\nThere are three volunteers who have already started to engage in architectural conversations and prototyping. So that NorthBridge does not waste anyone''s valuable time, I want to keep this early group small until we are as sure as possible that this is a go. Then we will start refining the tasks, communicating details, and looping in more volunteers.\n\nThe next, wider stakeholders meeting will take place in early March. I will definitely keep this group posted as we move along.\n\n\nThanks again, everyone. I think this will be a very rewarding project for you to participate in! Stay tuned...\n\n'),
(4, 2, '2013-04-23 00:32:12', 'We''ll be shovel-ready very soon on a Mobile-enabled workspace for NorthBridge sponsored development projects.\n\nWatch your email for project kickoff calls in early May. \n\nSprints June - August.\n\nVersion 1.0 out in September.'),
(5, 5, '2013-10-23 00:32:12', 'This project supports human rights work that is underway right now in Zimbabwe.\n\nA project Wiki and information about how to contribute will become available in November.\n\n- Kathy'),
(6, 2, '2013-05-10 02:34:00', 'Great news- the first sprint has already begun for this project with two collaborators!\r\n\r\nWe will have a 15-minute status call/kickoff on Saturday, May 18, at 2:00 p.m. You will learn how to collaborate on this project.We will cover the project scope, schedule, and overview of tasks. \r\n\r\nDial-In: 800.662.6992\r\nAccess Code: 2539929\r\n*6 to mute, *7 to unmute\r\n\r\nIf you can''t make that time, let me know. I will circulate project materials closer to the call.\r\n'),
(7, 2, '2013-10-07 18:00:00', 'Phenomenal progress last week! We have successfully distributed our project code base via GitHub, and Shoba and Kenneth have both built working local environments, deploying an actual app and seeing it run.\r\n\r\nWe will hit a steady tri-weekly cadence starting on Sunday, Oct. 13.\r\n\r\nOur backlog and task assignments will be managed going forward using our GitHub code repository issues tracking tool. (Thx Kenneth and Shoba for helping me think that through.)\r\n\r\nI believe we can create something simple but deployable by January.\r\n\r\nYou will need a free GitHub user id to contribute, going forward. This can be obtained at github.com. GitHub is an industry-standard tool for open source distributed development work.\r\n\r\nPeace. You''ll hear from me next on Oct. 13 to start Sprint 6.\r\n\r\nKathy'),
(8, 1, '2013-10-07 18:00:01', '(No recent official messages have been circulated.)'),
(9, 3, '2013-10-23 00:32:12', 'A standing team is forming now to meet regularly in order to keep the NorthBridge web site modern and useful.\n\nA project leader will contact you in early November to see if you wish to participate. \n\nKathy\n\n'),
(10, 2, '2013-10-13 18:00:00', '<p>Sprint 6 runs October 20 - November 2.</p>\n\n<p>Task commits are due by October 19.</p>\n\n<p>A prioritized backlog is now published and this is what we will use going forward to select tasks.</p>\n\n<p>If you wish to claim a task for this sprint, go to <a href="https://github.com/kdflint/northbridge-android/issues?state=open">https://github.com/kdflint/northbridge-android/issues?state=open</a> There are design, code and test tasks out there.</p>\n\n<p>See the Wiki for an explanation of how this works, especially the Task Management page at <a href="https://github.com/kdflint/northbridge-android/wiki/5a.-Task-Management">https://github.com/kdflint/northbridge-android/wiki/5a.-Task-Management</a></p>\n\n<p>You will need a free GitHub user id.</p>\n\n<p>If there is something you are itching to work on and you don''t see it on the backlog yet, ping me. There are still a lot of things to be added and this backlog is just a start.</p>\n\n<p>Kathy</p>'),
(11, 2, '2013-10-22 18:00:00', 'This project is publicly hosted and managed at GitHub (github.com).\n\nSee your Alliance Dashboard tab for next steps to get involved.\n\nAny questions at all... email to kathy.flint@northbridgetech.org\n\nChat with you soon!\n\nKathy');

CREATE SEQUENCE project_task_id_seq
    START WITH 3
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE project_task (
  id integer DEFAULT nextval('project_task_id_seq'::regclass) NOT NULL,
  name varchar(50) NOT NULL,
  descr varchar(200) DEFAULT NULL,
  due date DEFAULT NULL,
  complete boolean NOT NULL DEFAULT false,
  volunteer_id_fk integer DEFAULT NULL,
  project_id_fk integer NOT NULL,
  PRIMARY KEY (id)
) ;

COMMENT ON COLUMN project_task.volunteer_id_fk IS 'volunteer commited to this task';

INSERT INTO project_task (id, name, descr, due, complete, volunteer_id_fk, project_id_fk) VALUES
(1, 'test task', NULL, '2013-12-31', false, 1, 2),
(2, 'test task 2', NULL, '2013-10-25', false, 1, 2);

CREATE SEQUENCE quote_id_seq
    START WITH 4
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE quote (
  id integer DEFAULT nextval('quote_id_seq'::regclass) NOT NULL,
  quote varchar(2000) NOT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO quote (id, quote) VALUES
(1, 'Have you ever looked fear in the face and said, "I just don''t care?" ~Pink'),
(2, 'Until we are all free, we are none of us free. ~ Emma Lazarus'),
(3, 'Denouncing evil is a far cry from doing good. ~ Philip Gourevitch');

CREATE SEQUENCE schedule_id_seq
    START WITH 2
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE schedule (
  id integer DEFAULT nextval('schedule_id_seq'::regclass) NOT NULL,
  name varchar(25) DEFAULT NULL,
  PRIMARY KEY (id)
) ;


INSERT INTO schedule (id, name) VALUES
(1, 'NorthBridge Standard');

CREATE SEQUENCE skill_id_seq
    START WITH 13
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE skill (
  id integer DEFAULT nextval('skill_id_seq'::regclass) NOT NULL,
  skill_category varchar(40) NOT NULL,
  skill varchar(40) NOT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO skill (id, skill_category, skill) VALUES
(1, 'social', 'community'),
(2, 'social', 'organizational'),
(3, 'social', 'academic'),
(4, 'social', 'report'),
(5, 'social', 'other-social'),
(6, 'technology', 'data'),
(7, 'technology', 'test'),
(8, 'technology', 'architecture'),
(9, 'technology', 'analyze'),
(10, 'technology', 'code'),
(11, 'technology', 'manage'),
(12, 'technology', 'other-tech');

CREATE SEQUENCE task_manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE task_manager (
  id integer DEFAULT nextval('task_manager_id_seq'::regclass) NOT NULL,
  name varchar(50) NOT NULL,
  descr varchar(250) DEFAULT NULL,
  PRIMARY KEY (id)
) ;


CREATE SEQUENCE team_id_seq
    START WITH 10
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE team (
  id integer DEFAULT nextval('team_id_seq'::regclass) NOT NULL,
  focus varchar(50) NOT NULL,
  name varchar(250) DEFAULT NULL,
  visibility varchar(10) NOT NULL DEFAULT 'Private',
  task_manager_id integer DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO team (id, focus, name, visibility, task_manager_id) VALUES
(1, 'Python/*nix Shell', 'Team Magic', 'Public', NULL),
(2, 'User Experience', 'Team Awesome Sauce', 'Public', NULL),
(3, 'Android', 'Team Sweets', 'Public', NULL),
(4, 'PostgreSQL', '', 'Private', NULL),
(5, 'Architecture', 'Team Measure Twice', 'Private', NULL),
(6, 'Python/Django', 'Team Django Fandago', 'Public', NULL),
(7, 'Graphics', 'Team Scream', 'Public', NULL),
(0, 'Fake Team', '', 'Private', NULL),
(8, 'Joomla', '', 'Private', NULL),
(9, 'Agile Training', 'Team North Stars', 'Public', NULL);

CREATE SEQUENCE team_project_id_seq
    START WITH 9
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE team_project (
  id integer DEFAULT nextval('team_project_id_seq'::regclass) NOT NULL,
  team_id_fk integer NOT NULL,
  project_id_fk integer NOT NULL,
  start_event_fk integer DEFAULT NULL,
  end_event_fk integer DEFAULT NULL,
  claim_backlog varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO team_project (id, team_id_fk, project_id_fk, start_event_fk, end_event_fk, claim_backlog) VALUES
(1, 1, 1, 1, NULL, 'https://github.com/NorthBridge/kumuku-community/issues?labels=Team+Magic%2Copen&page=1&state=open'),
(2, 2, 8, 3, NULL, 'https://github.com/NorthBridge/alliance-desktop-community/issues?labels=Team+Awesome+Sauce%2Copen&pa'),
(3, 3, 3, 1, NULL, 'https://github.com/NorthBridge/alliance-android-community/issues?labels=Team+Sweets%2Copen&page=1&st'),
(4, 6, 2, 5, NULL, 'https://github.com/NorthBridge/nexus-community/issues?labels=open%2CTeam+Django+Fandango&page=1&stat'),
(5, 7, 8, 3, NULL, 'https://github.com/NorthBridge/alliance-desktop-community/issues?labels=open%2CTeam+Awesome-Sauce&pa'),
(6, 0, 0, 1, NULL, ''),
(7, 5, 2, 3, NULL, 'https://github.com/NorthBridge/nexus-community/issues?labels=open%2CTeam+Measure-Twice&page=1&state='),
(8, 9, 9, NULL, NULL, 'https://github.com/NorthBridge/playbook/milestones');

CREATE TABLE team_volunteer (
  volunteer_id_fk integer NOT NULL,
  team_id_fk integer NOT NULL,
  role varchar(20) NOT NULL DEFAULT 'Follower',
  conference_link varchar(120) DEFAULT NULL
) ;

INSERT INTO team_volunteer (volunteer_id_fk, team_id_fk, role, conference_link) VALUES
(62, 3, 'Follower', NULL),
(36, 3, 'Follower', NULL),
(123, 3, 'Follower', NULL),
(44, 3, 'Follower', NULL),
(42, 3, 'Follower', NULL),
(127, 6, 'Follower', NULL),
(58, 8, 'Follower', NULL),
(73, 3, 'Follower', NULL),
(91, 3, 'Follower', NULL),
(94, 3, 'Follower', NULL),
(124, 3, 'Follower', NULL),
(59, 2, 'Follower', NULL),
(59, 7, 'Follower', NULL),
(60, 6, 'Follower', NULL),
(60, 3, 'Follower', NULL),
(60, 1, 'Follower', NULL),
(60, 2, 'Follower', NULL),
(42, 7, 'Follower', NULL),
(42, 2, 'Follower', NULL),
(130, 3, 'Follower', NULL),
(36, 1, 'Follower', NULL),
(36, 6, 'Follower', NULL),
(36, 2, 'Follower', NULL),
(36, 7, 'Follower', NULL),
(132, 7, 'Follower', NULL),
(90, 1, 'Follower', NULL),
(134, 1, 'Follower', NULL),
(46, 1, 'Follower', NULL),
(46, 6, 'Follower', NULL),
(46, 2, 'Follower', NULL),
(46, 7, 'Follower', NULL),
(46, 3, 'Follower', NULL),
(46, 5, 'Contributor', NULL),
(47, 5, 'Contributor', NULL),
(135, 6, 'Follower', NULL),
(137, 6, 'Follower', NULL),
(49, 9, 'Contributor', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=c47ac02b6b46600e9ee1086c3cc01046'),
(158, 9, 'Contributor', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=b36ca3c80f431240a79c812f9c8d8196'),
(153, 9, 'Contributor', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=359b3e5dafe7720010408ce36a6d6e65'),
(53, 9, 'Coach', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=481a84cbff11940d48c5c32e25f85636'),
(36, 9, 'Contributor', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=fc2574d16ae893297bc2bcdc37335b32'),
(152, 9, 'Contributor', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=b313f1b4cfe150cd7d4040629f134287'),
(160, 9, 'Contributor', 'http://conference.northbridgetech.org/openmeetings/swf?invitationHash=d6c842fec7c68ccc43f06460d7a17c45');

CREATE SEQUENCE volunteer_id_seq
    START WITH 167
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;

CREATE TABLE volunteer (
  id integer DEFAULT nextval('volunteer_id_seq'::regclass) NOT NULL,
  email varchar(50) DEFAULT NULL,
  fname varchar(50) DEFAULT NULL,
  lname varchar(50) DEFAULT NULL,
  status varchar(10) DEFAULT NULL,
  field varchar(10) DEFAULT NULL,
  campaign_id_fk integer NOT NULL,
  create_dttm timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ;

INSERT INTO volunteer (id, email, fname, lname, status, field, campaign_id_fk, create_dttm) VALUES
(48, 'mary.demunster@usbank.com', 'Mary', 'Demunster', 'INTER-USB', '', 1, '2012-09-16 21:13:05'),
(47, 'nicholas.ocarroll@comcast.net', 'Nick', 'O''Carroll', 'INTER-USB', '', 1, '2012-10-28 00:51:44'),
(46, 'nee.david@gmail.com', 'David', 'Nee', 'INTER-USB', '', 1, '2012-10-28 00:51:12'),
(31, 'aleximmerman@gmail.com', 'Alexander', 'Immerman', 'INTEREST', '', 1, '2012-08-07 19:25:18'),
(33, 'tiffany@rumbalski.com', 'Tiffany', 'Rumbalski', 'LIST', '', 1, '2012-08-10 22:11:35'),
(75, 'cfree27@comcast.net', 'Cynthia', 'Free', 'INTEREST', '', 1, '2013-10-24 20:54:16'),
(36, 'kathy.flint@northbridgetech.org', 'Kathy', 'Flint', 'ORIENTED', '', 1, '2014-08-02 14:10:00'),
(41, 'Shantanu.ray@usbank.com', 'Shantanu', 'Ray', 'INTER-USB', '', 1, '2012-09-16 21:10:31'),
(40, 'fullmetallunchbox@gmail.com', 'Joshua', 'Nathan', 'INTER-USB', '', 1, '2013-09-11 23:23:23'),
(42, 'Sohini.13@gmail.com', 'Sohini', 'Datta', 'INTER-USB', '', 1, '2012-09-16 21:14:03'),
(43, 'leanne.bertucci@yahoo.com', 'Leanne', 'Bertucci', 'INTER-USB', '', 1, '2012-09-16 21:11:03'),
(44, 'shobaesr@gmail.com', 'Shoba', '', 'INTER-USB', '', 1, '2012-09-16 21:11:40'),
(45, 'jemk99@earthlink.net', 'John', 'Kawalko', 'INTER-USB', '', 1, '2012-09-16 21:13:05'),
(49, 'Auntizzie22@yahoo.com', 'Elizabeth', 'Eckhardt', 'ORIENTED', '', 1, '2014-07-09 00:52:32'),
(50, 'bethblaisdell@me.com', 'Beth', 'Blaisdell', 'LIST', '', 1, '2012-09-27 21:38:38'),
(51, 'mike@michaeljgreen.com', 'Mike', 'Green', 'INTEREST', '', 1, '2012-09-30 21:38:12'),
(73, 'sivakumar.kuppuswamy@northbridgetech.org', 'Shivakumar', 'Kuppuswamy', 'INTEREST', '', 1, '2012-08-07 19:25:18'),
(53, 'coach.lou@northbridgetech.org', 'Shailendra', 'Patel', 'ORIENTED', '', 1, '2014-08-02 14:09:16'),
(54, 'amy.graft@usbank.com', 'Amy', 'Graft', 'INTER-USB', '', 1, '2012-10-09 01:40:52'),
(55, 'imaizel@hotmail.com', 'Ilia', 'Maizel', 'INTER-USB', '', 1, '2012-10-09 01:41:06'),
(160, 'jafar.ahmad.71@gmail.com', 'Jafar', 'Abdelrahman', 'ORIENTED', '', 1, '2014-08-02 16:30:00'),
(58, 'jcrandall99@gmail.com', 'Jim', 'Crandall', 'INTEREST', '', 1, '2012-10-28 01:55:10'),
(60, 'rbweiner1@comcast.net', 'Ron', 'Weiner', 'INTEREST', '', 1, '2013-04-22 15:51:56'),
(61, 'datweeie@gmail.com', 'Michelle', 'Ketter', 'INTEREST', '', 1, '2013-04-22 15:51:56'),
(62, 'kenneth.cavness@gmail.com', 'Kenneth', 'Cavness', 'ORIENTED', '', 1, '2014-07-25 15:54:05'),
(63, 'artuluv@usbank.com', 'Asha', 'Tuluva', 'INTEREST', '', 1, '2013-04-22 15:51:56'),
(74, 'zaia.gilyana@northbridgetech.org', 'Zaia', 'Gilyana', 'INTEREST', '', 1, '2012-08-07 19:25:18'),
(76, 'diva@cowgrrl.com', 'Valerie', 'Cameo', 'LIST', '', 1, '2013-05-24 19:33:28'),
(77, 'andrea@chicagoadventuretherapy.org', 'Andrea', 'Knepper', 'LIST', '', 1, '2013-06-22 16:30:00'),
(78, 'elizabeth.t.tatum@gmail.com', 'Elizabeth', 'Tatum', 'LIST', '', 1, '2013-06-22 16:30:00'),
(80, 'jacqueline.a.clark@gmail.com', 'Jack', 'Clark', 'LIST', '', 1, '2013-06-22 16:30:00'),
(81, 'matthewzaradich@gmail.com', 'Matty', 'Zaradich', 'LIST', '', 1, '2013-06-22 16:30:00'),
(82, 'karenstipp@gmail.com', 'Karen', 'Stipp', 'LIST', '', 1, '2013-06-22 16:30:00'),
(83, 'lflint@cinci.rr.com', 'Mom and Dad', 'Flint', 'LIST', '', 1, '2013-06-22 16:30:00'),
(84, 'ldwaters@earthlink.net', 'Lisa', 'Waters', 'LIST', '', 1, '2013-06-22 16:30:00'),
(85, 'tamika_s_walker@hotmail.com', 'Tamika', 'Walker', 'LIST', '', 1, '2013-06-22 16:30:00'),
(86, 'waverlyw@gmail.com', 'Waverly', 'Walker', 'LIST', '', 1, '2013-06-27 00:55:40'),
(87, 'dupatton@umich.edu', 'Desmond', 'Patton', 'LIST', '', 1, '2013-06-22 16:30:00'),
(88, 'brooke@fhcmoms.org', 'Brooke', 'Bartlow', 'LIST', '', 1, '2013-06-22 16:30:00'),
(89, 'infjer@yahoo.com', 'Lora', 'Wiens', 'LIST', '', 1, '2013-06-22 16:30:00'),
(90, 'amos.etheridge@gmail.com', 'William', 'Etheridge', 'INTEREST', '', 2, '2013-10-24 22:38:49'),
(91, 'ajithaprasanna@yahoo.com', 'Ajitha', 'Thurvas', 'INTEREST', '', 2, '2013-10-24 22:38:56'),
(93, 'monteseyer@gmail.com', 'Monte', 'Seyer', 'INTEREST', '', 2, '2013-10-24 22:39:07'),
(94, 'abrummel@yahoo.com', 'Andy', 'Brummel', 'INTEREST', '', 2, '2013-10-24 22:39:15'),
(95, 'admin@rainbowunbroken.org', 'Suzanne', 'Coleman', 'LIST', '', 2, '2013-10-24 22:27:29'),
(96, 'laurih123@yahoo.com', 'Lauri', 'Hand', 'LIST', '', 2, '2013-10-24 22:27:14'),
(97, 'EyeGore22@hotmail.com', 'Christopher', 'Swenson', 'LIST', '', 2, '2013-10-24 22:27:14'),
(98, 'craigkopinski@gmail.com', 'Craig', 'Kopinski', 'INTEREST', '', 2, '2013-10-24 22:27:14'),
(99, 'villagomezj27@gmail.com', 'Jose', 'Villagomez', 'LIST', '', 2, '2013-10-24 22:27:14'),
(100, 'arlens@cinci.rr.com', 'Arlen', 'Swenson', 'LIST', '', 2, '2013-10-24 22:27:14'),
(101, 'dransom99@gmail.com', 'Douglas', 'Ransom', 'LIST', '', 2, '2013-10-24 22:27:14'),
(102, 'crojek@alumni.uchicago.edu', 'Craig', 'Rojek', 'LIST', '', 2, '2013-10-24 22:27:14'),
(103, 'jmoreno22@gmail.com', 'John', 'Morena', 'LIST', '', 2, '2013-10-24 22:27:14'),
(104, 'leedsjudy@gmail.com', 'Judy', 'Leeds', 'LIST', '', 2, '2013-10-24 22:27:14'),
(105, 'rfstudios@aol.com', 'Robin', 'Freedenfeld', 'LIST', '', 2, '2013-10-24 22:27:14'),
(106, 'alexander.buob@gmail.com', 'Alex', 'Buob', 'LIST', '', 2, '2013-10-24 22:27:14'),
(107, 'g_ma_2004@yahoo.com', 'Skip', 'Swenson', 'LIST', '', 2, '2013-10-24 22:27:14'),
(108, 'a_sweet_one_2@yahoo.com', 'Kari', 'Swenson', 'LIST', '', 2, '2013-10-24 22:27:14'),
(109, 'gyrlspy@yahoo.com', 'Janice', 'Yates', 'LIST', '', 2, '2013-10-24 22:27:14'),
(110, 'richard.ptack@usbank.com', 'Rich', 'Ptack', 'LIST', '', 2, '2013-10-24 22:27:14'),
(111, 'ksen@eb.com', 'Kunal', 'Sen', 'LIST', '', 2, '2013-10-24 22:27:14'),
(112, 'danavaziri@yahoo.com', 'Dana', 'Talya', 'LIST', '', 2, '2013-10-24 22:27:14'),
(113, 'stephen@gelmanmanor.com', 'Steve', 'Gelman', 'LIST', '', 2, '2013-10-24 22:27:14'),
(114, 'ericclim@yahoo.com', 'Eric', 'Lim', 'LIST', '', 2, '2013-10-24 22:27:14'),
(115, 'kelly.j.johnson@comcast.net', 'Kelly', 'Johnson', 'LIST', '', 2, '2013-10-24 22:27:14'),
(116, 'MDiedrich@ngelaw.com', 'Michael', 'Diedrich', 'LIST', '', 2, '2013-10-24 22:27:14'),
(117, 'katnterry@gmail.com', '', '', 'LIST', '', 1, '2013-10-30 16:53:53'),
(118, 'bezzy21@yahoo.com', '', '', 'LIST', '', 1, '2013-11-12 22:44:50'),
(122, 'brittanyvanputten@gmail.com', 'Brittany', 'VanPutten', 'LIST', '', 1, '2013-11-25 16:39:53'),
(123, 'lk_prasanna@yahoo.com', 'Prasanna', 'Laguduva', '', '', 1, '2013-11-24 05:27:27'),
(124, 'grahamtroyerjoy@gmail.com', 'Graham', '', '', '', 1, '2014-01-08 22:07:32'),
(125, 'tom@civiclab.us', '', '', 'LIST', '', 1, '2014-01-10 04:56:25'),
(127, 'bryce.m.flint@gmail.com', 'Bryce', 'Flint', 'REGISTER', '', 1, '2014-06-19 18:32:31'),
(128, 'lcolpoys@illinoislegalaid.org', 'Lisa', 'Colpoys', '', '', 1, '2014-01-27 17:21:23'),
(129, 'lmhand123@live.com', '', '', 'LIST', '', 1, '2014-01-29 14:06:31'),
(130, 'asha.malgireddy@usbank.com', 'Asha', 'Malgireddy', '', '', 1, '2014-01-29 20:01:24'),
(131, 'emmanuelmarcha@gmail.com', '', '', '', '', 1, '2014-01-31 00:49:37'),
(132, 'bridgett.colling@gmail.com', '', '', '', '', 1, '2014-01-31 04:44:38'),
(133, 'jmatz@comptia.org', '', '', 'LIST', '', 1, '2014-02-06 22:31:24'),
(134, 'ghbrown60640@gmail.com', 'Glenn', 'Brown', '', '', 1, '2014-02-11 02:45:11'),
(135, 'shannonjc143@gmail.com', 'Shannon', 'Cochran', '', '', 1, '2014-02-28 01:37:42'),
(136, 'weinert69george@gmail.com', '', '', 'LIST', '', 1, '2014-04-22 17:41:26'),
(137, 'xiongsw@hotmail.com', 'shangwu', '', 'REGISTER', '', 1, '2014-06-25 01:45:52'),
(146, 'JimKeck21@gmail.com', 'Jim', 'Keck', 'LIST', '', 1, '2014-06-05 02:06:25'),
(147, 'jmpopoca@outlook.com', '', '', '', '', 1, '2014-06-16 02:28:40'),
(153, 'rstephenhenry@gmail.com', 'Stephen', 'Henry', 'ORIENTED', '', 1, '2014-08-02 14:10:15'),
(152, 'gretchen.saylor@gmail.com', 'Gretchen', 'Saylor', 'ORIENTED', '', 1, '2014-07-25 15:55:00'),
(154, 'arika.verma@gmail.com', 'Arika', 'Verma', '', '', 0, '2014-06-24 14:37:03'),
(155, 'howard.levy@sbcglobal.net', 'Howard', 'Levy', '', '', 0, '2014-06-24 14:37:03'),
(156, 'angelica.c.flint@gmail.com', 'angelica', 'flint', 'REGISTER', '', 1, '2014-06-24 19:35:43'),
(157, 'skalwani@yahoo.com', '', '', 'LIST', '', 1, '2014-06-26 19:37:16'),
(158, 'Wjalston2@yahoo.com', 'Will ', 'Alston ', 'REGISTER', '', 1, '2014-07-21 10:59:06'),
(161, 'rtorphy83341@floopa.com', '', '', 'LIST', '', 1, '2014-08-07 20:06:05'),
(162, 'rdhudgens@gmail.com', '', '', 'LIST', '', 1, '2014-08-07 23:06:37'),
(163, 'daniel.terrasi@usbank.com', '', '', 'LIST', '', 1, '2014-09-30 13:43:49'),
(164, 'rcheek@cinci.rr.com', '', '', 'LIST', '', 1, '2014-10-03 13:51:37'),
(165, 'kathy.d.flint@gmail.com', 'Kathy', '', 'INTEREST', '', 1, '2014-10-31 17:33:47'),
(166, 'rarose@zoomtown.com', '', '', 'LIST', '', 1, '2014-12-16 14:10:26');

CREATE TABLE volunteer_skill (
  volunteer_id_fk integer NOT NULL,
  skill_id_fk integer NOT NULL,
  note varchar(200) DEFAULT NULL,
  PRIMARY KEY (volunteer_id_fk,skill_id_fk)
) ;

INSERT INTO volunteer_skill (volunteer_id_fk, skill_id_fk, note) VALUES
(1, 12, 'hey hey 6'),
(1, 6, ''),
(36, 6, ''),
(36, 7, ''),
(1, 1, 'hey hey 3'),
(1, 3, 'hey hey 5'),
(36, 8, ''),
(36, 9, ''),
(56, 1, ''),
(56, 5, 'I love my spouse'),
(123, 11, ''),
(123, 10, ''),
(123, 9, ''),
(123, 8, ''),
(123, 7, ''),
(123, 6, ''),
(122, 1, 'Experienced in outreach and marketing'),
(122, 2, 'I have received training in program and project evaluation and project management. I am comfortable in an Agile environment'),
(122, 5, ''),
(122, 6, 'Analyzing data in R, SPSS, SQL/MySQL'),
(122, 10, 'Basic PHP, Python, Javascript and HTML'),
(124, 6, ''),
(124, 8, ''),
(124, 9, ''),
(124, 10, ''),
(124, 11, ''),
(124, 1, ''),
(124, 4, ''),
(128, 2, ''),
(60, 7, 'Working on learning mobile security  for iOS and Android'),
(130, 7, ''),
(130, 11, ''),
(36, 11, ''),
(36, 1, 'I got bothered'),
(36, 4, 'note'),
(134, 1, ''),
(135, 6, ''),
(135, 7, ''),
(135, 10, ''),
(135, 1, ''),
(135, 2, ''),
(135, 4, ''),
(137, 10, 'c, c++, fortran, python, java');



============================

ALTER TABLE ONLY donation ADD CONSTRAINT campaign_id_fk FOREIGN KEY (campaign_id_fk) REFERENCES campaign(id);

ALTER TABLE ONLY project_leader ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id_fk) REFERENCES project(id);
ALTER TABLE ONLY project_leader ADD CONSTRAINT volunteer_id_fk FOREIGN KEY (volunteer_id_fk) REFERENCES volunteer(id);
  
ALTER TABLE ONLY project_message ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id_fk) REFERENCES project(id);
  
ALTER TABLE ONLY skill ADD CONSTRAINT skill UNIE
  UNIQUE KEY skill (skill)
  
ALTER TABLE ONLY skill ADD CONSTRAINT skill_ukey UNIQUE (id, skill);
  
ALTER TABLE ONLY team_volunteer ADD CONSTRAINT team_volunteer_ukey UNIQUE (volunteer_id_fk,team_id_fk);

ALTER TABLE ONLY volunteer ADD CONSTRAINT volunteer_ukey UNIQUE (id,email);
ALTER TABLE ONLY volunteer ADD CONSTRAINT campaign_id_fk FOREIGN KEY (campaign_id_fk) REFERENCES campaign(id);
