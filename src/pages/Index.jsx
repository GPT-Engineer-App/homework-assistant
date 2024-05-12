import React, { useState } from "react";
import { Container, VStack, Heading, Text, Input, Button, Textarea, useToast, HStack } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const toast = useToast();

  

  const handleApiResponse = async () => {
    const response = await new Promise((resolve) => setTimeout(() => resolve({ answer: "This is a simulated response based on your question." }), 1000));
    return response.answer;
  };

  const handleQuestionSubmit = async () => {
    if (!question) {
      toast({
        title: "Error",
        description: "Please enter a question.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const answer = await handleApiResponse();

    setChatHistory((prev) => [...prev, { question, answer, file }]);
    setQuestion("");
    setFile(null);

    toast({
      title: "Question Submitted",
      description: "We have received your question and are fetching the answer!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" padding={4}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl" textAlign="center">
          StudyHelp Chatbot
        </Heading>
        <HStack width="100%" spacing={10}>
          <VStack width="50%" spacing={4}>
            {chatHistory.map((chat, index) => (
              <VStack key={index} spacing={4} align="stretch" borderWidth="1px" borderRadius="lg" p={4}>
                <Text fontWeight="bold">{chat.question}</Text>
                <Text>{chat.answer}</Text>
                {chat.file && <Text>File attached</Text>}
              </VStack>
            ))}
          </VStack>
          <VStack width="50%" spacing={4}>
            <Text>Enter your question:</Text>
            <Textarea placeholder="Type your question here..." value={question} onChange={(e) => setQuestion(e.target.value)} size="lg" />
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} size="lg" />
            <Button leftIcon={<FaQuestionCircle />} colorScheme="teal" onClick={handleQuestionSubmit} isFullWidth>
              Submit Question
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
