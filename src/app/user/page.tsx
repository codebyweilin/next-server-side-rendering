// This page will always be server-rendered and dynamic

import React from "react";

// Example API for testing
const API_URL = "https://randomuser.me/api/";

async function fetchUser() {
  const res = await fetch(API_URL, {
    cache: "no-store", // This ensures SSR every request (no cache!)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  return data.results[0]; // get first user
}

export default async function UsersPage() {
  const user = await fetchUser(); // Server Side

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>
      <img src={user.picture.large} alt="User Picture" />
      <h2>
        {user.name.first} {user.name.last}
      </h2>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.location.city}, {user.location.country}
      </p>
    </div>
  );
}
