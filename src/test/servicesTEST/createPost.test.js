// import getAllPost from "../../services/post/crud/getAllPost";
// import { jest } from "@jest/globals";

// // Mock the getAllPost function
// jest.mock("../../services/post/crud/getAllPost");

// test("getAllPost returns expected data", async () => {
//   // Define the data you want the mock function to return
//   const mockData = [
//     { id: 1, title: "Test Post", content: "This is a test post." },
//   ];

//   // Make the mock function return the mock data
//   getAllPost.mockResolvedValue(mockData);

//   // Call the function and check if it returns the mock data
//   const data = await getAllPost();
//   expect(data).toEqual(mockData);
// });
test("1 + 1 equals 2", () => {
  expect(1 + 1).toBe(2);
});

// Testing er bare lort, man skal jo virkelig kun bruge jest på unittest...
