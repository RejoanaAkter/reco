'use client'

import React, { useEffect, useState } from 'react';
import HomeCoverScreen from './cover';
import { useAuth } from "@/components/AuthContext";
import { useRouter } from 'next/navigation';

function HomeScreen() {

  return (
    <div >
      <HomeCoverScreen />
    </div>
  );
}

export default HomeScreen
