PGDMP  1                    }            charme    17.4    17.4 '               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16387    charme    DATABASE     l   CREATE DATABASE charme WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pt-BR';
    DROP DATABASE charme;
                     postgres    false            �            1255    16388 0   alterar_tipo_usuario(integer, character varying)    FUNCTION     A  CREATE FUNCTION public.alterar_tipo_usuario(uid integer, novo_tipo character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF novo_tipo NOT IN ('cliente', 'profissional', 'admin') THEN
        RAISE EXCEPTION 'Tipo inv lido.';
    END IF;

    UPDATE users SET tipo = novo_tipo WHERE id = uid;
END;
$$;
 U   DROP FUNCTION public.alterar_tipo_usuario(uid integer, novo_tipo character varying);
       public               postgres    false            �            1255    16389    insert_user_info()    FUNCTION     �   CREATE FUNCTION public.insert_user_info() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO user_info (id, name, phone, address)
    VALUES (NEW.id, NEW.name, NULL, NULL); 
    RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.insert_user_info();
       public               postgres    false            �            1259    16390    agendamento    TABLE     �   CREATE TABLE public.agendamento (
    id integer NOT NULL,
    cliente_id integer NOT NULL,
    profissional_id integer NOT NULL,
    servico_id integer NOT NULL,
    data date NOT NULL,
    hora time without time zone NOT NULL
);
    DROP TABLE public.agendamento;
       public         heap r       postgres    false            �            1259    16393    agendamento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.agendamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.agendamento_id_seq;
       public               postgres    false    217                       0    0    agendamento_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.agendamento_id_seq OWNED BY public.agendamento.id;
          public               postgres    false    218            �            1259    16394    servicos    TABLE     �   CREATE TABLE public.servicos (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    preco_cents numeric(10,2) NOT NULL,
    duracao_minutos integer NOT NULL
);
    DROP TABLE public.servicos;
       public         heap r       postgres    false            �            1259    16397    servicos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.servicos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.servicos_id_seq;
       public               postgres    false    219                       0    0    servicos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.servicos_id_seq OWNED BY public.servicos.id;
          public               postgres    false    220            �            1259    16398 	   user_info    TABLE     �   CREATE TABLE public.user_info (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    phone character varying(15),
    address character varying(255)
);
    DROP TABLE public.user_info;
       public         heap r       postgres    false            �            1259    16401    user_info_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.user_info_id_seq;
       public               postgres    false    221                       0    0    user_info_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.user_info_id_seq OWNED BY public.user_info.id;
          public               postgres    false    222            �            1259    16402    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    tipo character varying(20) DEFAULT 'cliente'::character varying NOT NULL,
    CONSTRAINT users_tipo_check CHECK (((tipo)::text = ANY (ARRAY[('cliente'::character varying)::text, ('profissional'::character varying)::text, ('admin'::character varying)::text])))
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16407    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    223                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    224            h           2604    16408    agendamento id    DEFAULT     p   ALTER TABLE ONLY public.agendamento ALTER COLUMN id SET DEFAULT nextval('public.agendamento_id_seq'::regclass);
 =   ALTER TABLE public.agendamento ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217            i           2604    16409    servicos id    DEFAULT     j   ALTER TABLE ONLY public.servicos ALTER COLUMN id SET DEFAULT nextval('public.servicos_id_seq'::regclass);
 :   ALTER TABLE public.servicos ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219            j           2604    16410    user_info id    DEFAULT     l   ALTER TABLE ONLY public.user_info ALTER COLUMN id SET DEFAULT nextval('public.user_info_id_seq'::regclass);
 ;   ALTER TABLE public.user_info ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221            k           2604    16411    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223                      0    16390    agendamento 
   TABLE DATA           ^   COPY public.agendamento (id, cliente_id, profissional_id, servico_id, data, hora) FROM stdin;
    public               postgres    false    217   �.                 0    16394    servicos 
   TABLE DATA           J   COPY public.servicos (id, nome, preco_cents, duracao_minutos) FROM stdin;
    public               postgres    false    219   �.                 0    16398 	   user_info 
   TABLE DATA           =   COPY public.user_info (id, name, phone, address) FROM stdin;
    public               postgres    false    221   J/                 0    16402    users 
   TABLE DATA           @   COPY public.users (id, name, password, email, tipo) FROM stdin;
    public               postgres    false    223   �/                  0    0    agendamento_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.agendamento_id_seq', 8, true);
          public               postgres    false    218                        0    0    servicos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.servicos_id_seq', 4, true);
          public               postgres    false    220            !           0    0    user_info_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_info_id_seq', 1, false);
          public               postgres    false    222            "           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public               postgres    false    224            o           2606    16413    agendamento agendamento_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.agendamento DROP CONSTRAINT agendamento_pkey;
       public                 postgres    false    217            q           2606    16415    servicos servicos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.servicos
    ADD CONSTRAINT servicos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.servicos DROP CONSTRAINT servicos_pkey;
       public                 postgres    false    219            s           2606    16417    user_info user_info_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_info DROP CONSTRAINT user_info_pkey;
       public                 postgres    false    221            u           2606    16419    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    223            w           2606    16421    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    223            {           2620    16422    users after_user_insert    TRIGGER     w   CREATE TRIGGER after_user_insert AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.insert_user_info();
 0   DROP TRIGGER after_user_insert ON public.users;
       public               postgres    false    223    226            x           2606    16423 '   agendamento agendamento_cliente_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.users(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.agendamento DROP CONSTRAINT agendamento_cliente_id_fkey;
       public               postgres    false    4727    223    217            y           2606    16428 ,   agendamento agendamento_profissional_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_profissional_id_fkey FOREIGN KEY (profissional_id) REFERENCES public.users(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.agendamento DROP CONSTRAINT agendamento_profissional_id_fkey;
       public               postgres    false    217    223    4727            z           2606    16433 '   agendamento agendamento_servico_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.agendamento
    ADD CONSTRAINT agendamento_servico_id_fkey FOREIGN KEY (servico_id) REFERENCES public.servicos(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.agendamento DROP CONSTRAINT agendamento_servico_id_fkey;
       public               postgres    false    4721    217    219               =   x�3�4�4�4�4202�50�54�44�20 ".s��	BΒ��*g�3�� ���qqq ��S         P   x�3��MMOT�H�,�43 =N#.΀̼�ҢD��T��ĤԜ|NC�C#.#N׊�Լ��/��4F������ ��         S   x�3��)ͬ��".CΜ����bNCKKKs3#KN�2=���b�ļ���̼��b.c��Ģ��b�63Μ�ҢD(/F���  �           x�e��n�0  �3|�gt*�92�Q��]J)���
�2�~�6���{���䦍�|d�#Q�jQ�wA��%�*ͽ3��[�	_��""Aѧy~�'��c�}	�����,8�u�iĹW ���*�P�5�Gt���~>�
��� fLa�������D�EMw�k�.��rV�t8f��� �3 IIV�ǯ��ä�`K��I}��D��h��tij���Ơl�0S��r9=�˒�O�Ĳ�Y%���	zw����i�r�Ј~��1���o���K,}+     