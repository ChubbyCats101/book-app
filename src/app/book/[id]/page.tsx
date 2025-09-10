"use client";
import { Book } from "@/types/book";
import { Box, Typography, Paper, Divider, Stack, Button } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./css-detail.css";

export default function Page() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        const _book: Book = data["book"];
        setBook(_book);
      }
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  return (
    <Box p={3} display="flex" justifyContent="center">
      {book && (
        <Paper elevation={3} sx={{ p: 4, minWidth: 350, maxWidth: 600 }}>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            <Typography variant="subtitle1" color="text.secondary">
              ผู้แต่ง: {book.author}
            </Typography>
            {book.year && (
              <Typography variant="body2" color="text.secondary">
                ปีที่พิมพ์: {book.year}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {book.description}
            </Typography>
          </Stack>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Link href="/" passHref>
              <Button variant="contained" color="primary">
                กลับไปหน้าหลัก
              </Button>
            </Link>
          </Box>
        </Paper>
      )}
      {!book && (
        <Typography variant="body1" color="text.secondary">
          กำลังโหลดข้อมูลหนังสือ...
        </Typography>
      )}
    </Box>
  );
}
