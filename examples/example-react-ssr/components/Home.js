import React, { useState } from 'react'
import { Box } from '@fower/react'
import { css } from '@emotion/css'

export const Home = () => {
  const [theme, setTheme] = useState(false)

  return (
    <Box square-500 bgBlue100 bgRed100={theme}>
      <Box onClick={() => setTheme(!theme)} toCenter py-20>
        switch theme
      </Box>
      <Box row borderBottom-1 flex-4>
        <Box flex-4 className={myClassName}>
          name
        </Box>
        <Box flex-8>address</Box>
      </Box>
      {userList.map((user) => {
        const { name, address } = user
        return (
          <Box key={name} row borderBottom-1 borderGray100>
            <Box flex-4 fontBold gray900>
              {name}
            </Box>
            <Box flex-8 gray500>
              {address}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

const userList = [
  {
    name: 'Tom',
    address: 'BeiJing',
  },
  {
    name: 'Jack',
    address: 'Tokyo',
  },
]
