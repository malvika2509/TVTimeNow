# TV Schedule App

### Project Overview

This project is a TV schedule app that fetches TV schedule data from the **TVMaze API** and displays it using **React** with **Tailwind CSS** for a modern, responsive user interface. Additionally, the app integrates the **Gemini API** for the users to search for TV shows and provides show summaries, offering a seamless and more personalized experience.

### Features

- **Fetch TV Schedule Data**: The app fetches data from the **TVMaze API**, which provides information about TV shows, channels, episodes, and more.

- **Search Functionality**: Users can search for TV shows by name or type. The search query is used to fetch relevant TV show data from the **TVMaze API**.

- **Gemini API Integration for Summaries**: For each show retrieved from the TVMaze API, the app also queries the **Gemini API** to fetch a concise summary of the show. This summary is then displayed alongside the show name.

- **Unique Channel Display**: The app extracts unique TV channel names from the API response and removes duplicates using a **Set** to ensure that only distinct channels are displayed.

- **Gradient Channel Cards**: For a visually appealing UI, each TV channel is represented as a colorful gradient card. These cards are dynamically generated based on the extracted channel names.

- **Responsive Design**: The UI is fully responsive and adapts seamlessly to different screen sizes, ensuring an optimal experience on both mobile and desktop devices.

- **Show Details**: Clicking on a channel brings users to a page with more details about the shows available on that channel, including episode names, air dates, and summaries.

## Sequence of Implementation

### 1. **Fetching TV Data from TVMaze API**

- The app fetches TV show data based on the user’s search query via the **TVMaze API**. To optimize performance, the search input is debounced before making the API call. This ensures that data is only fetched once the user stops typing for a short period, minimizing unnecessary requests.

### 2. **Extracting and Displaying Unique TV Channels**

- Once the data is fetched, the app extracts unique TV channel names from the API response. This is accomplished using a **Set**, which automatically removes duplicate channel names. The unique channel names are then mapped to individual gradient cards, providing a visually appealing display of available channels.

### 3. **Navigating to Show Details**

- Upon clicking on a channel, the user is navigated to a detailed page that lists all shows for that channel. Each show is displayed in a card layout. When a user clicks on a specific show, a modal appears with detailed metadata such as the show title, air dates, and other relevant information fetched from the JSON response.

### 4. **Integrating Gemini API for Show Summaries**

- To enhance the user experience, the app integrates the **Gemini API** to provide AI-generated show summaries. After fetching TV show data, the app sends a query to the **Gemini-1.5-Flash** model to fetch concise summaries of each show. This integration allows users to gain additional context and information about each show, improving their browsing experience.

### 5. **Displaying Show Cards with Summaries**

- Each TV show is displayed on a card with the following elements:
  - **Background Image**: If available, the card uses the show's background image; otherwise, it falls back to a gradient.
  - **Show Name**: Displayed on top of the background.
  - **Show Summary**: A concise summary, fetched from the **Gemini API**, is displayed at the bottom of the card in a semi-transparent background, making it easy for users to get an overview of the show at a glance.

### 6. **Search Functionality**

- The app includes a search bar that allows users to search for TV shows by query. As the user types in the search box, debounced requests are sent to the **TVMaze API** to fetch relevant show data. Simultaneously, the **Gemini API** is used to fetch summaries for the shows, giving users both up-to-date show information and context-rich descriptions.

### 7. **Responsive Layout with Tailwind CSS**

- The app is styled using **Tailwind CSS**, which enables a responsive design. The layout automatically adjusts based on the screen size, ensuring a seamless user experience across different devices. Whether on mobile, tablet, or desktop, users will have an optimal and visually consistent experience while browsing TV shows.

### Technologies Used

- **React**: Used for building the interactive user interface with reusable components and state management.
- **Tailwind CSS**: Provides utility-first CSS classes for styling the app quickly and efficiently.
- **TVMaze API**: Provides data about TV shows, episodes, and channels.
- **Gemini API**: Powers the AI-generated summaries for TV shows based on the user's search query.

### Why This Approach?

- **Optimized Search**: By fetching show data based on search queries from **TVMaze API** and combining it with AI-powered summaries from **Gemini API**, the app offers a rich and personalized search experience for the user.
- **Data Management**: The integration of **Set** ensures that only unique TV channel names are displayed, which makes the interface more organized and reduces redundancy.
- **User-Centered Design**: With colorful gradient cards and responsive layout, the app is not only functional but also aesthetically pleasing and easy to navigate. Tailwind CSS makes it easy to adjust for a wide range of screen sizes.

- **Scalability**: As the app is built using modular React components, it can scale effortlessly as more channels, shows, and features are added.

- **Effeccient Error HAndling**: The app keeps a check on errors and logs them properly avoiding crashing or confusion on false api requests.It also lets the user know when the results are loading.

### How to Use

1. Clone this repository to your local machine.
2. Install the required dependencies by running:**npm install**
3. Run the app using:**npm start**
4. Open the app in your browser. You'll be able to search for TV shows by entering a query in the search bar. The app will fetch relevant shows and display them with their names and concise summaries generated by Gemini.

### Future Enhancements

- **Improved Search Filters**: Implement additional filters to allow users to sort shows by category, air date, or genre.
- **Show Favorites**: Allow users to favorite or bookmark shows they are interested in to receive reminders or updates.
- **Advanced Show Recommendations**: Use more sophisticated AI-based recommendations based on user preferences and viewing history.
- **Implement inifnite scrolling** Instead of pagination for a more seamless experience

### Conclusion

This TV Schedule App is a great example of using multiple APIs to create a dynamic and interactive app. The integration of **TVMaze API** for fetching TV schedule data and **Gemini API** for generating AI-powered summaries enhances the user experience by providing not only detailed schedules but also concise show descriptions. With its sleek, responsive design powered by **Tailwind CSS** and **React**, this app is a great foundation for building TV-related apps that require real-time data and personalized information.
