-- Verifica se as tabelas existem e cria se não existirem
DO $$ 
BEGIN
    -- Verifica whatsapp_leads
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'whatsapp_leads') THEN
        CREATE TABLE whatsapp_leads (
            id TEXT PRIMARY KEY,
            whatsapp TEXT NOT NULL,
            source TEXT NOT NULL,
            country TEXT,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            checked BOOLEAN NOT NULL DEFAULT false
        );
    END IF;

    -- Verifica waiting_list
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'waiting_list') THEN
        CREATE TABLE waiting_list (
            id TEXT PRIMARY KEY,
            whatsapp TEXT NOT NULL,
            source TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            checked BOOLEAN NOT NULL DEFAULT false
        );
    END IF;

    -- Verifica quiz_leads
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quiz_leads') THEN
        CREATE TABLE quiz_leads (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            capital TEXT NOT NULL,
            utm_source TEXT,
            utm_medium TEXT,
            utm_campaign TEXT,
            utm_content TEXT,
            utm_term TEXT,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            checked BOOLEAN NOT NULL DEFAULT false
        );
    END IF;
END $$; 