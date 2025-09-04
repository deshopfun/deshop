import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useSnackPresistStore } from 'lib';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { Http } from 'utils/http/http';

const DocsFees = () => {
  const [content, setContent] = useState<string>('');

  const { setSnackSeverity, setSnackMessage, setSnackOpen } = useSnackPresistStore((state) => state);

  const init = async () => {
    try {
      const response = await fetch(Http.fees_md);
      const fileContents = await response.text();
      const htmlContents = await marked(fileContents);
      const cleanContents = DOMPurify.sanitize(htmlContents);
      setContent(cleanContents);
    } catch (e) {
      setSnackSeverity('error');
      setSnackMessage('The network error occurred. Please try again later.');
      setSnackOpen(true);
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Container>
      <Card>
        <CardContent>
          <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DocsFees;
