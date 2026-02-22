import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Brain, Calendar, Star, Users, Tag, Search } from "lucide-react";
import { memories, journalEntries } from "../data/mockData";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";

export function Memories() {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMemories = memories.filter((memory) => {
    const matchesFilter = filter === "all" || memory.importance === filter;
    const matchesSearch = memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const groupedByMonth = filteredMemories.reduce((acc, memory) => {
    const monthKey = memory.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(memory);
    return acc;
  }, {} as Record<string, typeof memories>);

  const categories = Array.from(new Set(memories.map(m => m.category)));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Your Memories</h1>
        <p className="text-xl text-gray-600">Important moments captured by AI from your journals and conversations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Memories</p>
                <p className="text-3xl mt-1">{memories.length}</p>
              </div>
              <Brain className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-3xl mt-1">
                  {memories.filter(m => m.importance === 'high').length}
                </p>
              </div>
              <Star className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl mt-1">
                  {memories.filter(m => m.date.getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-3xl mt-1">{categories.length}</p>
              </div>
              <Tag className="w-10 h-10 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search memories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter by Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                className={filter === "all" ? "w-full bg-amber-600 hover:bg-amber-700" : "w-full"}
                onClick={() => setFilter("all")}
              >
                All Memories
              </Button>
              <Button
                variant={filter === "high" ? "default" : "outline"}
                className={filter === "high" ? "w-full bg-amber-600 hover:bg-amber-700" : "w-full"}
                onClick={() => setFilter("high")}
              >
                High Priority
              </Button>
              <Button
                variant={filter === "medium" ? "default" : "outline"}
                className={filter === "medium" ? "w-full bg-amber-600 hover:bg-amber-700" : "w-full"}
                onClick={() => setFilter("medium")}
              >
                Medium Priority
              </Button>
              <Button
                variant={filter === "low" ? "default" : "outline"}
                className={filter === "low" ? "w-full bg-amber-600 hover:bg-amber-700" : "w-full"}
                onClick={() => setFilter("low")}
              >
                Low Priority
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center justify-between text-sm">
                    <span>{category}</span>
                    <Badge variant="secondary">
                      {memories.filter(m => m.category === category).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Memories Timeline */}
        <div className="lg:col-span-3 space-y-8">
          {Object.entries(groupedByMonth).map(([month, monthMemories]) => (
            <div key={month}>
              <h2 className="text-2xl mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-600" />
                {month}
              </h2>
              <div className="space-y-4">
                {monthMemories.map((memory) => {
                  const relatedJournal = journalEntries.find(j => j.id === memory.journalId);
                  return (
                    <Card key={memory.id} className={`${
                      memory.importance === 'high' ? 'border-amber-300 bg-amber-50' :
                      memory.importance === 'medium' ? 'border-blue-200 bg-blue-50' :
                      'border-gray-200'
                    }`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          {relatedJournal?.thumbnail && (
                            <img
                              src={relatedJournal.thumbnail}
                              alt="Memory"
                              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <Badge 
                                  variant="secondary"
                                  className={`mb-2 ${
                                    memory.importance === 'high' ? 'bg-amber-200 text-amber-800' :
                                    memory.importance === 'medium' ? 'bg-blue-200 text-blue-800' :
                                    'bg-gray-200 text-gray-800'
                                  }`}
                                >
                                  {memory.category}
                                </Badge>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  {memory.date.toLocaleDateString('en-US', { 
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                              {memory.importance === 'high' && (
                                <Star className="w-6 h-6 text-amber-600 fill-current" />
                              )}
                            </div>
                            
                            <p className="text-lg mb-3">{memory.description}</p>
                            
                            {memory.relatedPeople && memory.relatedPeople.length > 0 && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>Related people: {memory.relatedPeople.join(", ")}</span>
                              </div>
                            )}

                            {relatedJournal && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                  From journal entry: {relatedJournal.aiSummary.substring(0, 100)}...
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredMemories.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">No memories found matching your criteria</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
