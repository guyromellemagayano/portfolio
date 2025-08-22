export interface CommonWebAppComponentProps {
  /** Internal ID for the component (hidden from consumers) */
  _internalId?: string;
  /** Internal debug mode for the component (hidden from consumers) */
  _debugMode?: boolean;
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}
