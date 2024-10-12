import { useState } from 'react'

// eslint-disable-next-line react-hooks/rules-of-hooks
export const c = size => useState(() => Array.from({ length: size }))[0]
