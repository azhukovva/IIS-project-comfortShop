--
-- PostgreSQL database dump
--

-- Dumped from database version 17.1 (Debian 17.1-1.pgdg120+1)
-- Dumped by pg_dump version 17.1 (Debian 17.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    slug character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    parent_slug character varying(255)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (slug, name, parent_slug) FROM stdin;
books	Books	\N
fiction	Fiction	books
candels	Candels	\N
beeswax	Beeswax	candels
paraffin	Paraffin	candels
bakery	Bakery	\N
bread	Bread	bakery
pastries	Pastries	bakery
\.


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (slug);


--
-- Name: categories categories_parent_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_slug_fkey FOREIGN KEY (parent_slug) REFERENCES public.categories(slug);


--
-- PostgreSQL database dump complete
--

