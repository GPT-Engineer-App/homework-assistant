import React, { useState } from "react";
import { Container, VStack, Heading, Text, Input, Button, Textarea, useToast } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const toast = useToast();

  const handleQuestionSubmit = () => {
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

    // Here you would typically handle the question, e.g., sending it to a server for processing
    toast({
      title: "Question Submitted",
      description: "We are working on your question!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Add the question and file to chat history and clear the inputs
    setChatHistory((prev) => [...prev, { question, file }]);
    setQuestion("");
    setFile(null);
  };

  return (
    <Container centerContent maxW="container.md" padding={4}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl" textAlign="center">
          StudyHelp
        </Heading>
        <Text>Enter your question</Text>
        <Textarea placeholder="Type your question here..." value={question} onChange={(e) => setQuestion(e.target.value)} size="lg" />
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} size="lg" />
        <Button leftIcon={<FaQuestionCircle />} colorScheme="teal" onClick={handleQuestionSubmit} isFullWidth>
          Submit Question
        </Button>
        {chatHistory.map((chat, index) => (
          <VStack key={index} spacing={4} align="stretch" mt={4}>
            <Text fontWeight="bold">Question:</Text>
            <Text>{chat.question}</Text>
            {chat.file && <Text>File attached</Text>}
          </VStack>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
