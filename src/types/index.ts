export interface Task {
  id: string;
  content: string;
  status: string; // Now dynamic based on columns
}

export interface Column {
  id: string;
  title: string;
  status: string;
}