import { VersionGraph } from '@start9labs/start-sdk'
import { v_22_0_1_1 } from './v22.0.1.1'
import { v_22_0_1_2 } from './v22.0.1.2'

export const versionGraph = VersionGraph.of({
  current: v_22_0_1_2,
  other: [v_22_0_1_1],
})
