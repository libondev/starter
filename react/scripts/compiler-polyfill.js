import { useState } from 'react'

export const c = (size) => useState(() => new Array(size))[0]
