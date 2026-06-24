// const Chat = () => {
//   return (
//     <Container>
//       <Typography variant="h6">Chat</Typography>
//     </Container>
//   );
// };

// export default Chat;

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Users, Search } from 'lucide-react';

const Chat = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        </div>
        <Button className="gap-2">
          <Users className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      <Card className="min-h-[70vh] flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>

            <h3 className="text-2xl font-semibold mb-3">Start a conversation</h3>
            <p className="text-muted-foreground mb-8">
              Connect with other users, discuss products, or get support in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Browse Users
              </Button>
              <Button variant="outline" size="lg">
                Search Messages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future enhancement hint */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Chat functionality is coming soon. This page will support real-time messaging, product sharing, and more.
      </p>
    </div>
  );
};

export default Chat;
