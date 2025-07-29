import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import chatbotDemo from "@/assets/chatbot-demo.jpg";

type Message = {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hi there! I'm your onboarding assistant. I'm here to help you get started at Acme Corp. What can I help you with today?",
    sender: "ai",
    timestamp: new Date(),
  },
];

const demoResponses: Record<string, string> = {
  "benefits": "At Acme Corp, we offer comprehensive benefits including health, dental, and vision insurance that begins on your first day. We also have a 401(k) with 4% matching, unlimited PTO, and quarterly wellness stipends. Would you like me to send you the detailed benefits guide?",
  "laptop": "Your laptop has already been shipped and should arrive tomorrow. It's a MacBook Pro 16\" with 32GB RAM. IT has pre-installed all the software you'll need, but if you require additional programs, I can help you submit a request.",
  "orientation": "Your orientation is scheduled for Monday at 9:00 AM in the Main Conference Room. I've already added it to your calendar with all the details. Would you like me to send you the orientation agenda and materials in advance?",
  "hello": "Hello! Welcome to Acme Corp. I'm your personal onboarding assistant. I can help with benefits information, paperwork, scheduling your orientation, answering questions about company policies, and much more. What would you like to know about?",
};

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "I'm not sure how to help with that yet. Could you try asking about benefits, your laptop, or orientation?";
      
      // Check for keywords in the input
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("benefits") || lowerInput.includes("insurance") || lowerInput.includes("pto")) {
        response = demoResponses.benefits;
      } else if (lowerInput.includes("laptop") || lowerInput.includes("computer") || lowerInput.includes("equipment")) {
        response = demoResponses.laptop;
      } else if (lowerInput.includes("orientation") || lowerInput.includes("first day") || lowerInput.includes("start")) {
        response = demoResponses.orientation;
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        response = demoResponses.hello;
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <div className="absolute -z-10 inset-0 opacity-50">
        <img 
          src={chatbotDemo} 
          alt="Chat interface background" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <Card className="border-2 border-primary/20 shadow-lg overflow-hidden bg-card/80 backdrop-blur-sm">
        <div className="bg-slate-800 p-3 text-white">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-slate-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">HR</span>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm text-white">Smart HR Assistant</h3>
              <p className="text-xs text-white/80">Ready to guide your journey</p>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-3 flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about your onboarding..."
              className="flex-1 bg-background rounded-md px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-primary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend} size="sm">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}