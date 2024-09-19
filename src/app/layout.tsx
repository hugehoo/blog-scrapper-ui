'use client'

import React from 'react';
import styled from '@emotion/styled';
import '../styles/globals.css';
import SearchBar from "@/components/SearchBar";
import {SearchProvider} from "@/components/SearchContext";


const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  padding: 20px 0;
  margin-bottom: 40px;
`;


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <SearchProvider>
      <Container>
        <Header>
          <SearchBar/>
        </Header>
        {children}
      </Container>
    </SearchProvider>
    </body>
    </html>
  )
}
