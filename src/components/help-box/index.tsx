import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Analyst', 'Business Owner'];
  const applicationName = `Forecast events`;
  const tenantName = `Company`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Business Owner creates a Company
As a Business Owner,
I want to create a Company in the application,
So that I can start forecasting probabilities of real-life events for my business.

Title: Business Owner invites Analyst
As a Business Owner,
I want to invite an Analyst to my Company,
So that they can contribute to forecasting probabilities of real-life events.

Title: Business Owner adds a Function
As a Business Owner,
I want to add a Function to my Company,
So that I can define the factors that impact the forecast.

Title: Business Owner adds an Event
As a Business Owner,
I want to add an Event to my Company,
So that I can track real-life occurrences that impact the forecast.

Title: Analyst views Functions and Events
As an Analyst,
I want to view the Functions and Events added by the Business Owner,
So that I can understand the factors and occurrences that impact the forecast.

Title: Analyst updates a Function
As an Analyst,
I want to update a Function in the Company,
So that I can refine the factors that impact the forecast based on new information.

Title: Analyst updates an Event
As an Analyst,
I want to update an Event in the Company,
So that I can refine the real-life occurrences that impact the forecast based on new information.

Title: Analyst forecasts probabilities
As an Analyst,
I want to forecast probabilities of real-life events based on Functions and Events,
So that I can provide valuable insights to the Business Owner.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
