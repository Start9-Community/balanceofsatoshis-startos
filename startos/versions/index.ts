import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_22_1_7_0 } from './v22.1.7_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_22_1_7_0],
})
