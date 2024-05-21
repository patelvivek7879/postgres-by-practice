-- Creating sequence for customer table
CREATE SEQUENCE customer_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Creating customer table

-- Done
CREATE TABLE customer (
    customer_id integer DEFAULT nextval('public.customer_customer_id_seq'::regclass) NOT NULL,
    store_id smallint NOT NULL,
    first_name character varying(45) NOT NULL,
    last_name character varying(45) NOT NULL,
    email character varying(50),
    address_id smallint NOT NULL,
    activebool boolean DEFAULT true NOT NULL,
    create_date date DEFAULT ('now'::text)::date NOT NULL,
    last_update timestamp without time zone DEFAULT now(),
    active integer
);

-- inserted data into customer table
insert into customer values (1,1,'Mary','Smith','mary.smith@sakilacustomer.org',5,'t'),
(2,1	,'Patricia','Johnson','patricia.johnson@sakilacustomer.org', 6, 't'),
(3,1,'Linda','Williams','linda.williams@sakilacustomer.org',7	,'t')
,(4,	2,	'Barbara',	'Jones',	'barbara.jones@sakilacustomer.org',	8,	't')
,(5,	1,	'Elizabeth',	'Brown',	'elizabeth.brown@sakilacustomer.org',	9,	't')
,(6,	2,	'Jennifer',	'Davis',	'jennifer.davis@sakilacustomer.org',	10,	't')
,(7,	1,	'Maria',	'Miller',	'maria.miller@sakilacustomer.org',	11,	't')
,(8,	2,	'Susan',	'Wilson',	'susan.wilson@sakilacustomer.org',	12,	't')
,(9,	2,	'Margaret',	'Moore',	'margaret.moore@sakilacustomer.org',	13,	't')
,(10,	1,	'Dorothy',	'Taylor',	'dorothy.taylor@sakilacustomer.org',	14,	't');


--
-- Name: payment_payment_id_seq; Type: SEQUENCE; 
--

CREATE SEQUENCE payment_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

    CREATE TABLE payment (
    payment_id integer DEFAULT nextval('public.payment_payment_id_seq'::regclass) NOT NULL,
    customer_id smallint NOT NULL,
    staff_id smallint NOT NULL,
    rental_id integer NOT NULL,
    amount numeric(5,2) NOT NULL,
    payment_date timestamp without time zone NOT NULL
);

-- Inserted this data into payment table
insert into payment VALUES
(17503,	341	,2,	1520,	7.99,	'2007-02-15 22:25:46.996577'),
(17504,	341	,1,	1778,	1.99,	'2007-02-16 17:23:14.996577'),
(17505,	341	,1,	1849,	7.99,	'2007-02-16 22:41:45.996577'),
(17506,	341	,2,	2829,	2.99,	'2007-02-19 19:39:56.996577'),
(17507,	341	,2,	3130,	7.99,	'2007-02-20 17:31:48.996577'),
(17508,	341	,1,	3382,	5.99,	'2007-02-21 12:33:49.996577'),
(17509,	342	,2,	2190,	5.99,	'2007-02-17 23:58:17.996577'),
(17510,	342	,1,	2914,	5.99,	'2007-02-20 02:11:44.996577'),
(17511,	342	,1,	3081,	2.99,	'2007-02-20 13:57:39.996577'),
(17512,	343,	2,	1547,	4.99,	'2007-02-16 00:10:50.996577');