"use client";
import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Stack, Box } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import type { BookResponse, Book } from "../types/book";
import Link from "next/link";
import "./css-main.css";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/books");
    if (response.ok) {
      const data = await response.json();
      const resData: BookResponse = data;
      const books = resData.books;
      setBooksData(books);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <LibraryBooksIcon sx={{ fontSize: 48, color: "#1976d2", mr: 2 }} />
        <Typography variant="h3" fontWeight="bold">
          ห้องสมุดออนไลน์
        </Typography>
      </Box>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        รายการหนังสือทั้งหมดในห้องสมุดของเรา เลือกดูรายละเอียดแต่ละเล่มได้เลย!
      </Typography>
      {isLoading && <Typography>Loading...</Typography>}
      <Stack spacing={2}>
        {booksData &&
          booksData.map((book) => (
            <Link href={`/book/${book._id}`} key={book._id} style={{ textDecoration: "none" }}>
              <Card variant="outlined" sx={{ transition: "0.2s", "&:hover": { boxShadow: 4, bgcolor: "#f5f5f5" } }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ผู้แต่ง: {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
      </Stack>
    </Container>
  );
}
