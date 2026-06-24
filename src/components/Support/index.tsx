// const Support = () => {
//   return (
//     <Container>
//       <Typography variant="h6">Support</Typography>
//     </Container>
//   );
// };

// export default Support;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

import { Headphones, Mail, MessageCircle, Clock } from 'lucide-react';

const Support = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-10">
        <Headphones className="w-9 h-9 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Quick Help Cards */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Get instant help from our support team.</p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Email Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Send us a detailed message. We reply within 24 hours.</p>
            <Button variant="outline" className="w-full">
              Send Email
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <CardTitle>Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">Usually within</p>
            <p className="text-3xl font-bold text-amber-600">2 hours</p>
            <Badge variant="secondary" className="mt-4">
              Mon - Sun, 9AM - 10PM
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Have a question?</CardTitle>
          <p className="text-muted-foreground">Fill out the form below and we&apos;ll get back to you shortly.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="e.g. Order issue, Product question..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea rows={6} placeholder="Please describe your issue or question in detail..." />
          </div>

          <Button size="lg" className="w-full">
            Send Message
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-8">
        Need urgent help? Try our Live Chat or check our FAQ section.
      </p>
    </div>
  );
};

export default Support;
